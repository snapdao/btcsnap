const webpack = require('webpack');

module.exports = function override(config, env) {
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
            ENV: JSON.stringify(process.env.ENV),
            SENTRY_SOURCE: JSON.stringify(process.env.SENTRY_SOURCE),
        })
    );
    config.devtool = process.env.ENV === 'development' ? 'eval' : false;

    return config;
}
