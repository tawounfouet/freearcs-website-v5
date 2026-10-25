import test from 'node:test';
import assert from 'node:assert/strict';

import contactHandler from '../api/contact.mjs';

const validPayload = {
  firstName: 'Jane',
  name: 'Doe',
  email: 'jane.api@example.com',
  organisation: 'Example Pharma',
  fonction: '',
  phone: '',
  subject: 'Etude clinique',
  message: 'We would like to discuss a clinical operations project.',
  rgpdConsent: true,
  website: '',
  locale: 'en',
  sourcePage: '/contact',
  formStartedAt: Date.now() - 5000,
};

const createResponse = () => {
  const headers = new Map();

  return {
    statusCode: 200,
    body: '',
    setHeader(name, value) {
      headers.set(name.toLowerCase(), value);
    },
    getHeader(name) {
      return headers.get(name.toLowerCase());
    },
    end(body = '') {
      this.body = body;
    },
  };
};

const createRequest = (overrides = {}) => ({
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    origin: 'https://www.example.com',
    host: 'www.example.com',
    'x-forwarded-for': '203.0.113.10',
  },
  body: validPayload,
  socket: {},
  ...overrides,
});

const parseBody = (res) => JSON.parse(res.body);

test('rejects unsupported methods', async () => {
  const req = createRequest({ method: 'GET' });
  const res = createResponse();

  await contactHandler(req, res);

  assert.equal(res.statusCode, 405);
  assert.equal(res.getHeader('allow'), 'POST');
  assert.equal(parseBody(res).code, 'METHOD_NOT_ALLOWED');
});

test('rejects invalid payloads before delivery', async () => {
  const req = createRequest({
    body: {
      ...validPayload,
      email: 'not-an-email',
    },
  });
  const res = createResponse();

  await contactHandler(req, res);

  assert.equal(res.statusCode, 400);
  assert.equal(parseBody(res).code, 'VALIDATION_ERROR');
});

test('returns unavailable rather than a false success when transport is not configured', async () => {
  const previousMode = process.env.CONTACT_DELIVERY_MODE;
  const previousApiKey = process.env.RESEND_API_KEY;
  const previousFrom = process.env.CONTACT_FROM_EMAIL;
  const previousTo = process.env.CONTACT_TO_EMAIL;

  process.env.CONTACT_DELIVERY_MODE = 'resend';
  delete process.env.RESEND_API_KEY;
  delete process.env.CONTACT_FROM_EMAIL;
  delete process.env.CONTACT_TO_EMAIL;

  try {
    const req = createRequest({
      body: {
        ...validPayload,
        email: `unconfigured-${Date.now()}@example.com`,
      },
      headers: {
        ...createRequest().headers,
        'x-forwarded-for': `203.0.113.${Math.floor(Math.random() * 100) + 20}`,
      },
    });
    const res = createResponse();

    await contactHandler(req, res);

    assert.equal(res.statusCode, 503);
    assert.equal(parseBody(res).code, 'CONTACT_UNAVAILABLE');
  } finally {
    if (previousMode === undefined) delete process.env.CONTACT_DELIVERY_MODE;
    else process.env.CONTACT_DELIVERY_MODE = previousMode;

    if (previousApiKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previousApiKey;

    if (previousFrom === undefined) delete process.env.CONTACT_FROM_EMAIL;
    else process.env.CONTACT_FROM_EMAIL = previousFrom;

    if (previousTo === undefined) delete process.env.CONTACT_TO_EMAIL;
    else process.env.CONTACT_TO_EMAIL = previousTo;
  }
});

test('returns success only after the delivery provider accepts the message', async () => {
  const originalFetch = global.fetch;
  const previous = {
    mode: process.env.CONTACT_DELIVERY_MODE,
    key: process.env.RESEND_API_KEY,
    from: process.env.CONTACT_FROM_EMAIL,
    to: process.env.CONTACT_TO_EMAIL,
  };

  process.env.CONTACT_DELIVERY_MODE = 'resend';
  process.env.RESEND_API_KEY = 'test-key';
  process.env.CONTACT_FROM_EMAIL = 'Website <website@example.com>';
  process.env.CONTACT_TO_EMAIL = 'contact@example.com';

  let providerCalled = false;
  global.fetch = async () => {
    providerCalled = true;
    return {
      ok: true,
      status: 200,
      json: async () => ({ id: 'email_api_test' }),
    };
  };

  try {
    const req = createRequest({
      body: {
        ...validPayload,
        email: `success-${Date.now()}@example.com`,
      },
      headers: {
        ...createRequest().headers,
        'x-forwarded-for': `198.51.100.${Math.floor(Math.random() * 100) + 20}`,
      },
    });
    const res = createResponse();

    await contactHandler(req, res);

    assert.equal(providerCalled, true);
    assert.equal(res.statusCode, 200);
    assert.equal(parseBody(res).ok, true);
    assert.match(parseBody(res).submissionId, /^cnt_/);
  } finally {
    global.fetch = originalFetch;

    if (previous.mode === undefined) delete process.env.CONTACT_DELIVERY_MODE;
    else process.env.CONTACT_DELIVERY_MODE = previous.mode;

    if (previous.key === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previous.key;

    if (previous.from === undefined) delete process.env.CONTACT_FROM_EMAIL;
    else process.env.CONTACT_FROM_EMAIL = previous.from;

    if (previous.to === undefined) delete process.env.CONTACT_TO_EMAIL;
    else process.env.CONTACT_TO_EMAIL = previous.to;
  }
});
