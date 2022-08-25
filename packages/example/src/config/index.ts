declare var DATAAPI: string;
declare var PROJECT_TOKEN: string;
declare var ENV: "development" | "staging" | "production";

export const BACKENDAPI = DATAAPI
export const ENVIRONMENT = ENV || "development"
export const TRACK_TOKEN = PROJECT_TOKEN
export const VERSION = "0.9"
