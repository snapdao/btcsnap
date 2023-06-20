const through = require('through2');
const envify = require('envify/custom');

module.exports = {
  cliOptions: {
    "dist": "dist",
    "outfileName": "bundle.js",
    "port":8081,
    "src": "dist/index.js",
    "writeManifest": true,
  },
  bundlerCustomizer: (bundler) => {
    // We don't provide Buffer by default, so we need to provide it manually.
    bundler.transform(envify({
      NETWORK: process.env.NETWORK || undefined,
    }));
    bundler.transform(function () {
      let data = '';
      return through(
          function (buffer, _encoding, callback) {
            data += buffer;
            callback();
          },

          function (callback) {
            this.push("globalThis.Buffer = require('buffer/').Buffer;");
            this.push(data);
            callback();
          },
      );
    });
  },
};
