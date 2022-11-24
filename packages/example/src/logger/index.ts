import { captureException } from '@sentry/react';
import { generateLogger } from './logger';
import { ENVIRONMENT } from '../config';

const sentryLogger = generateLogger({
  enableReport: ENVIRONMENT !== 'development',
  errorConfig: {
    report: captureException,
  },
});

export const logger = sentryLogger;
