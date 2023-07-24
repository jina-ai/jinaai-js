/* eslint-disable @typescript-eslint/no-var-requires */
const base = require('./jest.base');

module.exports = {
  ...base,
  testMatch: [`**/tests/**/ex1*.realtest.(ts|tsx)`]
};