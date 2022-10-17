jest.mock('../../config', () => ({
  BACKEND_DOMAIN : 'api_host',
  BACKEND_AUTH : 'api_auth',
  ENVIRONMENT : "development",
  TRACK_TOKEN : '',
  VERSION : "1.0.0",
}));
