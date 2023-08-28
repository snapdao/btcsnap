const webpack = require('webpack');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

module.exports = function override(config, env) {
  const isNonDevEnv = process.env.ENV === 'staging' || process.env.ENV === 'production';

  //do stuff with the webpack config...
  config.resolve.fallback = {
    url: require.resolve('url'),
    assert: require.resolve('assert'),
    crypto: require.resolve('crypto-browserify'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify/browser'),
    buffer: require.resolve('buffer'),
    stream: require.resolve('stream-browserify'),
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.DefinePlugin({
      PROJECT_TOKEN: JSON.stringify(process.env.PROJECT_TOKEN),
      BACKEND_API_DOMAIN: JSON.stringify(process.env.BACKEND_API_DOMAIN),
      BACKEND_API_AUTH: JSON.stringify(process.env.BACKEND_API_AUTH),
      SNAP_BACKEND_API_DOMAIN: JSON.stringify(process.env.SNAP_BACKEND_API_DOMAIN),
      SNAP_BACKEND_API_AUTH: JSON.stringify(process.env.SNAP_BACKEND_API_AUTH),
      FIAT_MRCR_API_WIDGET_ID: JSON.stringify(process.env.FIAT_MRCR_API_WIDGET_ID),
      ENV: JSON.stringify(process.env.ENV),
      SENTRY_SOURCE: JSON.stringify(process.env.SENTRY_SOURCE),
    })
  );

  config.module.rules.push({
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false
    },
  });

  if(isNonDevEnv){
    config.plugins.push(
      new SentryWebpackPlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        release: process.env.SENTRY_RELEASE,
        include: 'build/',
      }),
    );
  }

  return config;
};
