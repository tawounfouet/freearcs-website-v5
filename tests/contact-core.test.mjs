import test from 'node:test';
import assert from 'node:assert/strict';

import {
  ContactRequestSchema,
  consumeMemoryRateLimit,
  isAllowedOrigin,
  isHoneypotTriggered,
  sanitizeHeaderValue,
} from '../api/_contact/core.mjs';

const validPayload = {
  firstName: 'Jane',
  name: 'Doe',
  email: 'jane.doe@example.com',
  organisation: 'Example Pharma',
  fonction: 'Clinical Operations Director',
  phone: '+33 6 00 00 00 00',
  subject: 'Etude clinique',
  message: 'We would like to discuss a clinical operations project.',
  rgpdConsent: true,
  website: '',
  locale: 'en',
  sourcePage: '/contact',
  formStartedAt: Date.now() - 5000,
};

test('accepts a valid contact payload', () => {
  const result = ContactRequestSchema.safeParse(validPayload);
  assert.equal(result.success, true);
});

test('rejects invalid email and missing consent', () => {
  const result = ContactRequestSchema.safeParse({
    ...validPayload,
    email: 'invalid',
    rgpdConsent: false,
  });

  assert.equal(result.success, false);
});

test('detects the honeypot field', () => {
  assert.equal(isHoneypotTriggered(validPayload), false);
  assert.equal(
    isHoneypotTriggered({ ...validPayload, website: 'https://spam.test' }),
    true,
  );
});

test('sanitizes values before use in mail headers', () => {
  assert.equal(
    sanitizeHeaderValue('Hello\r\nBcc: attacker@example.com'),
    'Hello Bcc: attacker@example.com',
  );
});

test('enforces the in-memory rate limit', () => {
  const key = `test-${Date.now()}-${Math.random()}`;
  const config = { max: 2, windowMs: 1000 };
  const now = 1000;

  assert.equal(consumeMemoryRateLimit(key, config, now).allowed, true);
  assert.equal(consumeMemoryRateLimit(key, config, now + 10).allowed, true);
  assert.equal(consumeMemoryRateLimit(key, config, now + 20).allowed, false);
  assert.equal(consumeMemoryRateLimit(key, config, now + 1100).allowed, true);
});

test('allows the current host origin by default', () => {
  const req = {
    headers: {
      origin: 'https://preview.example.com',
      host: 'preview.example.com',
    },
  };

  assert.equal(isAllowedOrigin(req, {}), true);
});

test('honors configured allowed origins', () => {
  const req = {
    headers: {
      origin: 'https://evil.example.com',
      host: 'app.example.com',
    },
  };

  assert.equal(
    isAllowedOrigin(req, {
      CONTACT_ALLOWED_ORIGINS: 'https://app.example.com',
    }),
    false,
  );
});
