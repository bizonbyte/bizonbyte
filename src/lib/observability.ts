import * as Sentry from '@sentry/node';

let initialized = false;

function initSentry() {
  if (initialized) return;
  initialized = true;
  const dsn = process.env.SENTRY_DSN?.trim();
  if (!dsn) return;

  Sentry.init({
    dsn,
    environment: process.env.SENTRY_ENVIRONMENT || process.env.VERCEL_ENV || 'development',
    sendDefaultPii: false,
    beforeSend(event) {
      delete event.request;
      delete event.breadcrumbs;
      delete event.extra;
      return event;
    },
  });
}

export function captureException(error: unknown, tags: Record<string, string> = {}) {
  initSentry();
  if (!process.env.SENTRY_DSN?.trim()) return;
  Sentry.withScope((scope) => {
    Object.entries(tags).forEach(([key, value]) => scope.setTag(key, value));
    Sentry.captureException(error);
  });
}
