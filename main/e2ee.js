/* eslint-disable no-param-reassign */
const appConfig = require('electron-settings');
const { ipcMain } = require('electron');
const { encrypt, decrypt } = require('../helpers/encryption');

function getEncryptionSettings() {
  // eslint-disable-next-line prefer-const
  let { iv, salt, validation, dataMigrated } = appConfig.getSync('encryption');

  iv = bufferToHex(iv);
  salt = bufferToHex(salt);

  return { iv, salt, validation, dataMigrated };
}

function bufferToHex(value) {
  if (!Buffer.isBuffer(value)) {
    return Buffer.from(value, 'hex');
  }
  return value
}

ipcMain.on('secret-key-updated', (event, { secretKey }) => {
  if ([null, undefined, ''].includes(secretKey)) {
    event.returnValue = { pass: false };
    event.sender.send('bad-secret-key');
    return;
  }

  const { iv, salt, validation, dataMigrated } = getEncryptionSettings();
  if (validation === null) {
    const validationKeyContent = { pass: true };
    appConfig.setSync(
      'encryption.validation',
      encrypt({
        secretKey,
        salt,
        iv,
        message: JSON.stringify(validationKeyContent),
      })
    );
    if (!dataMigrated) {
      event.sender.send('migrate-all-data');
    }
    event.returnValue = validationKeyContent;
    return;
  }
  const validationResult = decrypt({
    content: validation,
    secretKey,
    salt,
    iv,
  });

  if (!validationResult) {
    event.sender.send('bad-secret-key');
  }

  event.returnValue = validationResult;
});

ipcMain.on('encrypt-data', (event, { message, secretKey }) => {
  const { iv, salt } = getEncryptionSettings();
  event.returnValue = encrypt({ message, secretKey, iv, salt });
});

ipcMain.on('decrypt-data', (event, { content, secretKey }) => {
  const { iv, salt } = getEncryptionSettings();
  event.returnValue = decrypt({ content, secretKey, salt, iv });
});

ipcMain.on('decrypt-import-data', (event, { content, iv, salt, secretKey }) => {
  const value = decrypt({
    content,
    secretKey,
    salt: bufferToHex(salt),
    iv: bufferToHex(iv),
  });
  event.returnValue = value;
});

ipcMain.on('encryption-get-settings', (event) => {
  const {
    iv: ivHex,
    salt: saltHex,
    validation,
  } = appConfig.getSync('encryption');
  event.returnValue = { iv: ivHex, salt: saltHex, validation };
});

ipcMain.on('encryption-set-settings', (event, { iv, salt, validation }) => {
  appConfig.setSync('encryption.iv', iv);
  appConfig.setSync('encryption.salt', salt);
  appConfig.setSync('encryption.validation', validation);
  event.returnValue = true;
});

ipcMain.on('data-migrated', (event) => {
  appConfig.setSync('encryption.dataMigrated', true);
});
