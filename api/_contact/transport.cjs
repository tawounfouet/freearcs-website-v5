const { sanitizeHeaderValue } = require('./core.cjs');

class ContactConfigurationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ContactConfigurationError';
  }
}

class ContactDeliveryError extends Error {
  constructor(message, { provider = 'unknown', status = 0 } = {}) {
    super(message);
    this.name = 'ContactDeliveryError';
    this.provider = provider;
    this.status = status;
  }
}

const requireEnv = (env, key) => {
  const value = env[key];
  if (!value) {
    throw new ContactConfigurationError(`Missing required environment variable: ${key}`);
  }
  return value;
};

const buildBusinessText = ({ submissionId, payload, receivedAt }) => [
  'New contact request from the Freearcs Pharma Services website',
  '',
  `Submission ID: ${submissionId}`,
  `Received at: ${receivedAt}`,
  `Locale: ${payload.locale || 'fr'}`,
  `Source: ${payload.sourcePage || '/contact'}`,
  '',
  `First name: ${payload.firstName}`,
  `Last name: ${payload.name}`,
  `Email: ${payload.email}`,
  `Phone: ${payload.phone || '-'}`,
  `Organisation: ${payload.organisation}`,
  `Role: ${payload.fonction || '-'}`,
  `Subject: ${payload.subject}`,
  '',
  'Message:',
  payload.message,
].join('\n');

const deliverWithResend = async (
  submission,
  { env = process.env, fetchImpl = global.fetch } = {},
) => {
  const apiKey = requireEnv(env, 'RESEND_API_KEY');
  const from = requireEnv(env, 'CONTACT_FROM_EMAIL');
  const to = requireEnv(env, 'CONTACT_TO_EMAIL')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  if (to.length === 0) {
    throw new ContactConfigurationError('CONTACT_TO_EMAIL must contain at least one recipient.');
  }

  const subject = sanitizeHeaderValue(`[FPS Website] ${submission.payload.subject}`);

  const response = await fetchImpl('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: submission.payload.email,
      subject,
      text: buildBusinessText(submission),
    }),
  });

  if (!response.ok) {
    throw new ContactDeliveryError('Resend rejected the contact message.', {
      provider: 'resend',
      status: response.status,
    });
  }

  const data = await response.json();

  return {
    provider: 'resend',
    providerId: data?.id || null,
  };
};

const deliverWithWebhook = async (
  submission,
  { env = process.env, fetchImpl = global.fetch } = {},
) => {
  const url = requireEnv(env, 'CONTACT_WEBHOOK_URL');
  const token = env.CONTACT_WEBHOOK_TOKEN;

  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    throw new ContactConfigurationError('CONTACT_WEBHOOK_URL is not a valid URL.');
  }

  if (env.NODE_ENV === 'production' && parsedUrl.protocol !== 'https:') {
    throw new ContactConfigurationError('CONTACT_WEBHOOK_URL must use HTTPS in production.');
  }

  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetchImpl(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      event: 'contact.submitted',
      submissionId: submission.submissionId,
      receivedAt: submission.receivedAt,
      contact: {
        firstName: submission.payload.firstName,
        name: submission.payload.name,
        email: submission.payload.email,
        organisation: submission.payload.organisation,
        fonction: submission.payload.fonction || '',
        phone: submission.payload.phone || '',
        subject: submission.payload.subject,
        message: submission.payload.message,
        locale: submission.payload.locale,
        sourcePage: submission.payload.sourcePage || '/contact',
      },
    }),
  });

  if (!response.ok) {
    throw new ContactDeliveryError('Contact webhook rejected the message.', {
      provider: 'webhook',
      status: response.status,
    });
  }

  return {
    provider: 'webhook',
    providerId: response.headers?.get?.('x-request-id') || null,
  };
};

const deliverContact = async (submission, options = {}) => {
  const env = options.env || process.env;
  const mode =
    env.CONTACT_DELIVERY_MODE ||
    (env.CONTACT_WEBHOOK_URL ? 'webhook' : 'resend');

  if (mode === 'webhook') {
    return deliverWithWebhook(submission, options);
  }

  if (mode === 'resend') {
    return deliverWithResend(submission, options);
  }

  throw new ContactConfigurationError(
    `Unsupported CONTACT_DELIVERY_MODE: ${mode}`,
  );
};

module.exports = {
  ContactConfigurationError,
  ContactDeliveryError,
  buildBusinessText,
  deliverContact,
  deliverWithResend,
  deliverWithWebhook,
};
