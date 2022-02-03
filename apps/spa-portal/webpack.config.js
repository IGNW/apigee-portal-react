const webpack = require('webpack');
const nxReactBaseConfig = require('@nrwl/react/plugins/webpack');
const { merge } = require('webpack-merge');
// const { InjectManifest } = require('workbox-webpack-plugin');
// const path = require('path');
const { pick } = require('lodash');

module.exports = (webpackConfig, nxConfig) => {
  // Fix that Nx uses a different attribute when serving the app
  nxConfig.options = nxConfig.options || nxConfig.buildOptions;
  const config = nxReactBaseConfig(webpackConfig);

  const mergeWebpackConfigs = [config];

  mergeWebpackConfigs.push({
    plugins: [
      // FIX for HookState.js until next version (4?)
      new webpack.DefinePlugin({
        process: {},
      }),
      // Expanding NRWL passed variables
      new webpack.DefinePlugin({
        'process.env': getClientEnvironment().stringified, // it will automatically pick up key values from .env file
      }),
    ],
  });

  // For production we add the service worker
  // if (config.mode === 'production' || process.env.FIREBASE_FCM_DEV) {
  //   mergeWebpackConfigs.push({
  //     plugins: [
  //       new InjectManifest({
  //         compileSrc: true,
  //         // exclude: [/\w*/],
  //         include: ['assets/firebase-logo.png'],
  //         swSrc: path.resolve(
  //           nxConfig.options.root,
  //           nxConfig.options.sourceRoot,
  //           '/service-worker/firebase-service.ts'
  //         ),
  //         // this is the output of the plugin,
  //         // relative to webpack's output directory
  //         swDest: 'firebase-messaging-sw.js',
  //       }),
  //       ///////////////////////////////
  //       // new InjectManifest({
  //       //   compileSrc: true,
  //       //   swSrc: path.resolve(
  //       //     nxConfig.options.root,
  //       //     nxConfig.options.sourceRoot,
  //       //     './service-worker/service-worker-workbox.ts'
  //       //   ),
  //       //   // this is the output of the plugin,
  //       //   // relative to webpack's output directory
  //       //   swDest: 'service-worker.js',
  //       // }),
  //     ],
  //   });
  // }

  return merge(mergeWebpackConfigs);
};

// This is shamelessly taken from CRA and modified for NX use
// Then taken and modified again to support CRA and Gatsby normalize ENV vars too.
// https://github.com/facebook/create-react-app/blob/4784997f0682e75eb32a897b4ffe34d735912e6c/packages/react-scripts/config/env.js#L71
function getClientEnvironment(mode = 'development') {
  // Grab NODE_ENV and NX_* environment variables and prepare them to be
  // injected into the application via DefinePlugin in webpack configuration.
  // const NX_APP = /^NX_/i;
  // const REACT_APP = /^REACT_APP_/i;
  // const FIREBASE = /^FIREBASE_/i;
  const ENV_TEST_REGEX = /^(NX_)|(REACT_APP_)|(FIREBASE_)|(GOOGLE_)|(GATSBY_)/;

  const raw = Object.keys(process.env)
    .filter((key) => ENV_TEST_REGEX.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        // Useful for determining whether we’re running in production mode.
        NODE_ENV: process.env.NODE_ENV || mode,
        ...pick(process.env, [
          'PROJECT_ID',
          'FIREBASE_CONFIG',
          'FIRESTORE_PROJECT_ID',
        ]),
      }
    );

  // Stringify all values so we can feed into webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      console.log(env)
      return env;
    }, {}),
  };

  return { stringified };
}
