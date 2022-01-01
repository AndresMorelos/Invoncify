const crypto = require('crypto');
const appConfig = require('electron-settings')
const { ipcMain } = require('electron');
const { encrypt, decrypt } = require('../helpers/encryption');


// eslint-disable-next-line prefer-const
let { iv, salt, validation, dataMigrated } = appConfig.getSync('encryption');


if (!Buffer.isBuffer(iv)) {
    iv = Buffer.from(iv, 'hex')
}
if (!Buffer.isBuffer(salt)) {
    salt = Buffer.from(salt, 'hex')
}

ipcMain.on('secret-key-updated', (event, { secretKey }) => {
    if (validation === null) {
        const validationKeyContent = { pass: true }
        appConfig.setSync('encryption.validation',
            encrypt({
                secretKey,
                salt,
                iv,
                message: JSON.stringify(validationKeyContent)
            })
        )
        if (!dataMigrated) {
            event.sender.send('migrate-all-data');
        }
        event.returnValue = validationKeyContent
        return;
    }
    const validationResult = decrypt({ content: validation, secretKey, salt, iv })

    if (!validationResult) {
        event.sender.send('bad-secret-key')
    }

    event.returnValue = validationResult
    return;
});


ipcMain.on('encrypt-data', (event, { message, secretKey }) => {
    event.returnValue = encrypt({ message, secretKey, iv, salt })
})



ipcMain.on('decrypt-data', (event, { content, secretKey }) => {
    event.returnValue = decrypt({ content, secretKey, salt, iv })
});


ipcMain.on('encryption-get-settings', (event) => {
    const { iv: ivHex, salt: saltHex } = appConfig.getSync('encryption');
    event.returnValue = { iv: ivHex, salt: saltHex, validation }
})


ipcMain.on('data-migrated', (event) => {
    appConfig.setSync('encryption.dataMigrated', true);
})