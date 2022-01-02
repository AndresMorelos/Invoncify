const crypto = require('crypto');
const appConfig = require('electron-settings')
const { ipcMain } = require('electron');
const { encrypt, decrypt } = require('../helpers/encryption');




function getEncryptionSettings() {

    let { iv, salt, validation, dataMigrated } = appConfig.getSync('encryption');


    if (!Buffer.isBuffer(iv)) {
        iv = Buffer.from(iv, 'hex')
    }
    if (!Buffer.isBuffer(salt)) {
        salt = Buffer.from(salt, 'hex')
    }

    return { iv, salt, validation, dataMigrated }

}

ipcMain.on('secret-key-updated', (event, { secretKey }) => {
    const { iv, salt, validation, dataMigrated } = getEncryptionSettings()
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
    const { iv, salt } = getEncryptionSettings()
    event.returnValue = encrypt({ message, secretKey, iv, salt })
})



ipcMain.on('decrypt-data', (event, { content, secretKey }) => {
    const { iv, salt } = getEncryptionSettings()
    event.returnValue = decrypt({ content, secretKey, salt, iv })
});


ipcMain.on('encryption-get-settings', (event) => {
    const { iv, salt, validation } = getEncryptionSettings()
    const { iv: ivHex, salt: saltHex } = appConfig.getSync('encryption');
    event.returnValue = { iv: ivHex, salt: saltHex, validation }
})

ipcMain.on('encryption-set-settings', (event, { iv, salt, validation }) => {
    appConfig.setSync('encryption.iv', iv)
    appConfig.setSync('encryption.salt', salt)
    appConfig.setSync('encryption.validation', validation)
    event.returnValue = true
})


ipcMain.on('data-migrated', (event) => {
    appConfig.setSync('encryption.dataMigrated', true);
})