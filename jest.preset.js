require('dotenv-flow').config({ path: __dirname, silent: true });
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS?.startsWith(__dirname)) {
  process.env['GOOGLE_APPLICATION_CREDENTIALS'] =
    __dirname + '/' + process.env.GOOGLE_APPLICATION_CREDENTIALS;
}

const nxPreset = require('@nrwl/jest/preset');

module.exports = {
  ...nxPreset,
  detectOpenHandles: true,
  resolver: `${process.cwd()}/jest.resolver.js`,
  // resolver: 'jest-node-exports-resolver'
};
