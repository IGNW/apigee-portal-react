const webpack = require('webpack');
const { pick } = require('lodash');

module.exports = {
  // core: {
  //   builder: 'webpack5',
  // },
  stories: [],
  addons: [
    // 'storybook-react-i18next',
    '@storybook/addon-essentials',
    // '@react-theming/storybook-addon',
    // '@storybook/theming',
    'storybook-dark-mode',
  ],
  // uncomment the property below if you want to apply some webpack config globally
  webpackFinal: async (config) => {
    return {
      ...config,
      plugins: [
        ...config.plugins,
        // FIX for HookState.js until next version (4?)
        new webpack.DefinePlugin({
          process: {},
        }),
        // Expanding NRWL passed variables
        new webpack.DefinePlugin({
          'process.env': getClientEnvironment().stringified, // it will automatically pick up key values from .env file
        }),
      ],
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': require.resolve('@emotion/react'),
          'emotion-theming': require.resolve('@emotion/react'),
          '@emotion/styled': require.resolve('@emotion/styled'),
        },
      },
    };
  },
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
      return env;
    }, {}),
  };

  return { stringified };
}
