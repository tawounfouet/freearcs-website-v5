const crypto = require('node:crypto');
const { z } = require('zod');

const MAX_BODY_BYTES = 16 * 1024;
const DEFAULT_RATE_LIMIT_MAX = 5;
const DEFAULT_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const ContactRequestSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(254),
  organisation: z.string().trim().min(1).max(150),
  fonction: z.string().trim().max(150).optional().or(z.literal('')),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  subject: z.string().trim().min(1).max(160),
  message: z.string().trim().min(10).max(1500),
  rgpdConsent: z.literal(true),
  website: z.string().max(200).optional().or(z.literal('')),
  locale: z.enum(['fr', 'en']).default('fr'),
  sourcePage: z.string().trim().max(200).optional().or(z.literal('')),
  formStartedAt: z.number().int().positive().optional(),
}).strict();

const getHeader = (req, name) => {
  const value = req.headers?.[name] ?? req.headers?.[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
};

const getClientIp = (req) => {
  const forwardedFor = getHeader(req, 'x-forwarded-for');
  if (forwardedFor) {
    return String(forwardedFor).split(',')[0].trim();
  }

  return String(getHeader(req, 'x-real-ip') || req.socket?.remoteAddress || 'unknown');
};

const hashIdentity = (value) =>
  crypto.createHash('sha256').update(String(value || 'unknown')).digest('hex').slice(0, 24);

const createSubmissionId = () => `cnt_${crypto.randomUUID().replaceAll('-', '')}`;

const sanitizeHeaderValue = (value) =>
  String(value || '')
    .replace(/[\r\n]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const isHoneypotTriggered = (payload) => Boolean(payload.website?.trim());

const parsePositiveInteger = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const getRateLimitConfig = (env = process.env) => ({
  max: parsePositiveInteger(env.CONTACT_RATE_LIMIT_MAX, DEFAULT_RATE_LIMIT_MAX),
  windowMs: parsePositiveInteger(
    env.CONTACT_RATE_LIMIT_WINDOW_MS,
    DEFAULT_RATE_LIMIT_WINDOW_MS,
  ),
});

const memoryStore = globalThis.__fpsContactRateLimitStore || new Map();
globalThis.__fpsContactRateLimitStore = memoryStore;

const consumeMemoryRateLimit = (key, config, now = Date.now()) => {
  const existing = memoryStore.get(key);

  if (!existing || existing.resetAt <= now) {
    const next = { count: 1, resetAt: now + config.windowMs };
    memoryStore.set(key, next);
    return {
      allowed: true,
      remaining: Math.max(config.max - 1, 0),
      resetAt: next.resetAt,
      source: 'memory',
    };
  }

  existing.count += 1;
  memoryStore.set(key, existing);

  return {
    allowed: existing.count <= config.max,
    remaining: Math.max(config.max - existing.count, 0),
    resetAt: existing.resetAt,
    source: 'memory',
  };
};

const getRedisConfig = (env = process.env) => {
  const url = env.KV_REST_API_URL || env.UPSTASH_REDIS_REST_URL;
  const token = env.KV_REST_API_TOKEN || env.UPSTASH_REDIS_REST_TOKEN;

  return url && token ? { url: url.replace(/\/$/, ''), token } : null;
};

const consumeDistributedRateLimit = async (
  key,
  config,
  { env = process.env, fetchImpl = global.fetch } = {},
) => {
  const redis = getRedisConfig(env);
  if (!redis || typeof fetchImpl !== 'function') {
    return null;
  }

  const response = await fetchImpl(`${redis.url}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${redis.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      ['INCR', key],
      ['PEXPIRE', key, config.windowMs],
    ]),
  });

  if (!response.ok) {
    throw new Error(`Distributed rate limiter failed with status ${response.status}`);
  }

  const result = await response.json();
  const count = Number(result?.[0]?.result);

  if (!Number.isFinite(count)) {
    throw new Error('Distributed rate limiter returned an invalid counter.');
  }

  return {
    allowed: count <= config.max,
    remaining: Math.max(config.max - count, 0),
    resetAt: Date.now() + config.windowMs,
    source: 'redis',
  };
};

const consumeRateLimit = async (key, config, options = {}) => {
  try {
    const distributed = await consumeDistributedRateLimit(key, config, options);
    if (distributed) {
      return distributed;
    }
  } catch (error) {
    console.warn('contact.rate_limit.degraded', {
      reason: error?.message || 'unknown',
    });
  }

  return consumeMemoryRateLimit(key, config);
};

const isAllowedOrigin = (req, env = process.env) => {
  const origin = getHeader(req, 'origin');
  if (!origin) {
    return true;
  }

  const configured = String(env.CONTACT_ALLOWED_ORIGINS || '')
    .split(',')
    .map((item) => item.trim().replace(/\/$/, ''))
    .filter(Boolean);

  const normalizedOrigin = String(origin).replace(/\/$/, '');

  if (configured.length > 0) {
    return configured.includes(normalizedOrigin);
  }

  const host = getHeader(req, 'x-forwarded-host') || getHeader(req, 'host');
  if (!host) {
    return false;
  }

  try {
    return new URL(normalizedOrigin).host === String(host);
  } catch {
    return false;
  }
};

const getValidationFields = (zodError) => {
  const fields = {};

  for (const issue of zodError?.issues || []) {
    const field = issue.path?.[0];
    if (field && !fields[field]) {
      fields[field] = issue.code || 'INVALID_VALUE';
    }
  }

  return fields;
};

module.exports = {
  MAX_BODY_BYTES,
  ContactRequestSchema,
  consumeMemoryRateLimit,
  consumeRateLimit,
  createSubmissionId,
  getClientIp,
  getRateLimitConfig,
  getValidationFields,
  hashIdentity,
  isAllowedOrigin,
  isHoneypotTriggered,
  sanitizeHeaderValue,
};
