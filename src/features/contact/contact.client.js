const DEFAULT_TIMEOUT_MS = 12000;

export class ContactSubmissionError extends Error {
  constructor(message, { code = 'CONTACT_SUBMISSION_FAILED', status = 0, fields = null } = {}) {
    super(message);
    this.name = 'ContactSubmissionError';
    this.code = code;
    this.status = status;
    this.fields = fields;
  }
}

const readJsonSafely = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

export const submitContact = async (payload, { timeoutMs = DEFAULT_TIMEOUT_MS } = {}) => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      credentials: 'same-origin',
    });

    const body = await readJsonSafely(response);

    if (!response.ok || body?.ok !== true) {
      throw new ContactSubmissionError(
        body?.message || 'Contact submission failed.',
        {
          code: body?.code || 'CONTACT_SUBMISSION_FAILED',
          status: response.status,
          fields: body?.fields || null,
        },
      );
    }

    return body;
  } catch (error) {
    if (error instanceof ContactSubmissionError) {
      throw error;
    }

    if (error?.name === 'AbortError') {
      throw new ContactSubmissionError('Contact request timed out.', {
        code: 'TIMEOUT',
      });
    }

    throw new ContactSubmissionError('Contact request failed.', {
      code: 'NETWORK_ERROR',
    });
  } finally {
    window.clearTimeout(timeoutId);
  }
};
