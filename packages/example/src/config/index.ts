declare let BACKEND_API_DOMAIN: string;
declare let BACKEND_API_AUTH: string;
declare let SNAP_BACKEND_API_DOMAIN: string;
declare let SNAP_BACKEND_API_AUTH: string;
declare let PROJECT_TOKEN: string;
declare let ENV: 'development' | 'staging' | 'production';
declare let SENTRY_SOURCE: string;

export const BACKEND_DOMAIN = BACKEND_API_DOMAIN;
export const BACKEND_AUTH = BACKEND_API_AUTH;

export const SNAP_BACKEND_DOMAIN = SNAP_BACKEND_API_DOMAIN;
export const SNAP_BACKEND_AUTH = SNAP_BACKEND_API_AUTH;

export const ENVIRONMENT = ENV || 'development';
export const TRACK_TOKEN = PROJECT_TOKEN;
export const VERSION = '1.0.0';

export const SENTRY_DSN = SENTRY_SOURCE || '';
