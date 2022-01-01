const crypto = require('crypto');
const appConfig = require('electron-settings')
const { ipcMain } = require('electron');
const { encrypt, decrypt } = require('../helpers/encription');


// eslint-disable-next-line prefer-const
let { iv, salt, validation } = appConfig.getSync('encription');


if (!Buffer.isBuffer(iv)) {
    iv = Buffer.from(iv, 'hex')
}
if (!Buffer.isBuffer(salt)) {
    salt = Buffer.from(salt, 'hex')
}

ipcMain.on('secret-key-updated', (event, { secretKey }) => {
    if (validation === null) {
        const validationKeyContent = { pass: true }
        appConfig.setSync('encription.validation',
            encrypt({
                secretKey,
                salt,
                iv,
                message: JSON.stringify(validationKeyContent)
            })
        )
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


ipcMain.on('encription-get-settings', (event) => {
    const { iv : ivHex, salt: saltHex } = appConfig.getSync('encription');
    event.returnValue = { iv: ivHex, salt: saltHex, validation }
})
