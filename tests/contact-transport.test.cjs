const test = require('node:test');
const assert = require('node:assert/strict');

const {
  ContactConfigurationError,
  deliverWithResend,
  deliverWithWebhook,
} = require('../api/_contact/transport.cjs');

const submission = {
  submissionId: 'cnt_test',
  receivedAt: '2026-10-25T22:00:00.000Z',
  payload: {
    firstName: 'Jane',
    name: 'Doe',
    email: 'jane@example.com',
    organisation: 'Example Pharma',
    fonction: '',
    phone: '',
    subject: 'Clinical study\r\nBcc: bad@example.com',
    message: 'We would like to discuss a project.',
    locale: 'en',
    sourcePage: '/contact',
  },
};

test('Resend transport uses text content and sanitizes subject header', async () => {
  let request;

  const fetchImpl = async (url, options) => {
    request = { url, options };
    return {
      ok: true,
      status: 200,
      json: async () => ({ id: 'email_123' }),
    };
  };

  const result = await deliverWithResend(submission, {
    fetchImpl,
    env: {
      RESEND_API_KEY: 'test-key',
      CONTACT_FROM_EMAIL: 'Website <website@example.com>',
      CONTACT_TO_EMAIL: 'contact@example.com',
    },
  });

  assert.equal(result.provider, 'resend');
  assert.equal(result.providerId, 'email_123');

  const body = JSON.parse(request.options.body);
  assert.equal(request.url, 'https://api.resend.com/emails');
  assert.equal(body.subject.includes('\n'), false);
  assert.equal(body.reply_to, 'jane@example.com');
  assert.match(body.text, /Submission ID: cnt_test/);
});

test('Resend transport refuses missing server configuration', async () => {
  await assert.rejects(
    () => deliverWithResend(submission, { env: {}, fetchImpl: async () => null }),
    ContactConfigurationError,
  );
});

test('Webhook transport sends the normalized contact envelope', async () => {
  let request;

  const fetchImpl = async (url, options) => {
    request = { url, options };
    return {
      ok: true,
      status: 200,
      headers: { get: () => 'req_123' },
    };
  };

  const result = await deliverWithWebhook(submission, {
    fetchImpl,
    env: {
      NODE_ENV: 'production',
      CONTACT_WEBHOOK_URL: 'https://automation.example.com/contact',
      CONTACT_WEBHOOK_TOKEN: 'secret',
    },
  });

  assert.equal(result.provider, 'webhook');
  assert.equal(result.providerId, 'req_123');
  assert.equal(request.options.headers.Authorization, 'Bearer secret');

  const body = JSON.parse(request.options.body);
  assert.equal(body.event, 'contact.submitted');
  assert.equal(body.contact.email, 'jane@example.com');
});
