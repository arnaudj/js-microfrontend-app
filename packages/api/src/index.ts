export const VERSION = require('../package.json').version;
export const NONCE = 'id' + Math.floor(Math.random() * 1000000);

export * from './state';
