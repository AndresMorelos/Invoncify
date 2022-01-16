const path = require('path');
const { Application } = require('spectron');
const { encrypt, decrypt } = require('../helpers/encryption');
const appPath = path.join(
  __dirname,
  '../dist/mac/Invoncify.app/Contents/MacOS/Invoncify'
);
const iv = Buffer.from('d4c70d5cc4baa0524cb083599da41bed', 'hex');
const salt = Buffer.from('65f0f8c114abdf2289ad9411acfb7300', 'hex');

function initializeSpectron() {
  return new Application({
    path: appPath,
    env: {
      ELECTRON_ENABLE_LOGGING: true,
      ELECTRON_ENABLE_STACK_DUMPING: true,
      NODE_ENV: 'development',
    },
    startTimeout: 10000,
  });
}

function encryptData({ message }) {
  return encrypt({ secretKey: 'secret', salt, message, iv });
}

function decryptData({ content }) {
  return decrypt({ secretKey: 'secret', salt, content, iv });
}

module.exports = { initializeSpectron, encryptData, decryptData };
