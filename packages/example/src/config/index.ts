declare var BACKEND_API_DOMAIN: string;
declare var BACKEND_API_AUTH: string;
declare var PROJECT_TOKEN: string;
declare var ENV: "development" | "staging" | "production";
declare var SENTRY_SOURCE: string

export const BACKEND_DOMAIN = BACKEND_API_DOMAIN
export const BACKEND_AUTH = BACKEND_API_AUTH

export const ENVIRONMENT = ENV || "development"
export const TRACK_TOKEN = PROJECT_TOKEN
export const VERSION = "1.0.0"

export const SENTRY_DSN = SENTRY_SOURCE
