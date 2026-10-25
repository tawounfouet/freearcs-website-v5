import {
  MAX_BODY_BYTES,
  ContactRequestSchema,
  consumeRateLimit,
  createSubmissionId,
  getClientIp,
  getRateLimitConfig,
  getValidationFields,
  hashIdentity,
  isAllowedOrigin,
  isHoneypotTriggered,
} from './_contact/core.mjs';
import {
  ContactConfigurationError,
  ContactDeliveryError,
  deliverContact,
} from './_contact/transport.mjs';

const sendJson = (res, status, body, extraHeaders = {}) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  for (const [key, value] of Object.entries(extraHeaders)) {
    res.setHeader(key, value);
  }

  res.end(JSON.stringify(body));
};

const parseBody = (req) => {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  if (typeof req.body === 'string') {
    return JSON.parse(req.body);
  }

  return {};
};

export default async function contactHandler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(
      res,
      405,
      {
        ok: false,
        code: 'METHOD_NOT_ALLOWED',
        message: 'Method not allowed.',
      },
      { Allow: 'POST' },
    );
  }

  if (!isAllowedOrigin(req)) {
    return sendJson(res, 403, {
      ok: false,
      code: 'ORIGIN_NOT_ALLOWED',
      message: 'Request origin is not allowed.',
    });
  }

  const contentType = String(req.headers?.['content-type'] || '');
  if (!contentType.toLowerCase().startsWith('application/json')) {
    return sendJson(res, 415, {
      ok: false,
      code: 'UNSUPPORTED_MEDIA_TYPE',
      message: 'Content-Type must be application/json.',
    });
  }

  let rawPayload;
  try {
    rawPayload = parseBody(req);
  } catch {
    return sendJson(res, 400, {
      ok: false,
      code: 'INVALID_JSON',
      message: 'Invalid JSON payload.',
    });
  }

  const payloadSize = Buffer.byteLength(JSON.stringify(rawPayload || {}), 'utf8');
  if (payloadSize > MAX_BODY_BYTES) {
    return sendJson(res, 413, {
      ok: false,
      code: 'PAYLOAD_TOO_LARGE',
      message: 'Payload is too large.',
    });
  }

  const parsed = ContactRequestSchema.safeParse(rawPayload);

  if (!parsed.success) {
    return sendJson(res, 400, {
      ok: false,
      code: 'VALIDATION_ERROR',
      message: 'Invalid form data.',
      fields: getValidationFields(parsed.error),
    });
  }

  const payload = parsed.data;

  if (isHoneypotTriggered(payload)) {
    console.info('contact.rejected.spam', {
      reason: 'honeypot',
    });

    return sendJson(res, 202, {
      ok: true,
      submissionId: createSubmissionId(),
      message: 'Message received.',
    });
  }

  const rateLimitConfig = getRateLimitConfig();
  const clientIpHash = hashIdentity(getClientIp(req));
  const emailHash = hashIdentity(payload.email.toLowerCase());

  const [ipLimit, emailLimit] = await Promise.all([
    consumeRateLimit(`fps:contact:ip:${clientIpHash}`, rateLimitConfig),
    consumeRateLimit(`fps:contact:email:${emailHash}`, rateLimitConfig),
  ]);

  const limitingResult = !ipLimit.allowed
    ? ipLimit
    : !emailLimit.allowed
      ? emailLimit
      : null;

  if (limitingResult) {
    const retryAfterSeconds = Math.max(
      Math.ceil((limitingResult.resetAt - Date.now()) / 1000),
      1,
    );

    console.info('contact.rejected.rate_limit', {
      source: limitingResult.source,
      retryAfterSeconds,
    });

    return sendJson(
      res,
      429,
      {
        ok: false,
        code: 'RATE_LIMITED',
        message: 'Too many requests.',
      },
      { 'Retry-After': String(retryAfterSeconds) },
    );
  }

  const submissionId = createSubmissionId();
  const receivedAt = new Date().toISOString();

  console.info('contact.received', {
    submissionId,
    receivedAt,
  });

  try {
    const delivery = await deliverContact({
      submissionId,
      receivedAt,
      payload,
    });

    console.info('contact.delivery.success', {
      submissionId,
      provider: delivery.provider,
      providerId: delivery.providerId,
    });

    return sendJson(res, 200, {
      ok: true,
      submissionId,
      message: 'Message received.',
    });
  } catch (error) {
    if (error instanceof ContactConfigurationError) {
      console.error('contact.configuration_error', {
        submissionId,
        reason: error.message,
      });

      return sendJson(res, 503, {
        ok: false,
        code: 'CONTACT_UNAVAILABLE',
        message: 'Contact service is temporarily unavailable.',
      });
    }

    if (error instanceof ContactDeliveryError) {
      console.error('contact.delivery.failure', {
        submissionId,
        provider: error.provider,
        status: error.status,
      });

      return sendJson(res, 503, {
        ok: false,
        code: 'DELIVERY_FAILED',
        message: 'Message could not be delivered.',
      });
    }

    console.error('contact.internal_error', {
      submissionId,
      name: error?.name || 'Error',
    });

    return sendJson(res, 500, {
      ok: false,
      code: 'INTERNAL_ERROR',
      message: 'Unexpected contact service error.',
    });
  }
}
