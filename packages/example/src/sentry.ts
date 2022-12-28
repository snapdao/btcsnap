import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { ENVIRONMENT, SENTRY_DSN } from './config';

export const initSentry = () => {
  if(ENVIRONMENT !== 'development') {
    Sentry.init({
      dsn: SENTRY_DSN,
      integrations: [new BrowserTracing()],
    });
  }
};
