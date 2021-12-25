const crypto = require('crypto');
const appConfig = require('electron-settings')
const { ipcMain } = require('electron');


let iv;
let salt;
const algorithm = 'aes-256-ctr';

iv = appConfig.getSync('encription.iv');
salt = appConfig.getSync('encription.salt')

if (!iv) {
    iv = crypto.randomBytes(16);
    appConfig.setSync('encription.iv', iv.toString('hex'))
} else if (!Buffer.isBuffer(iv)) {
    iv = Buffer.from(iv, 'hex')
}

if (!salt) {
    salt = crypto.randomBytes(16);
    appConfig.setSync('encription.salt', iv.toString('hex'))
} else if (!Buffer.isBuffer(salt)) {
    salt = Buffer.from(salt, 'hex')
}

function generateKey(secretKey) {
    return crypto.scryptSync(secretKey, salt, 32);
}

ipcMain.on('encrypt-data', (event, { message, secretKey }) => {
    const cipher = crypto.createCipheriv(algorithm, generateKey(secretKey), iv);
    const encrypted = Buffer.concat([cipher.update(message), cipher.final()]);
    return encrypted.toString('hex')
})



ipcMain.on('decrypt-data', (event, { content, secretKey }) => {
    const decipher = crypto.createDecipheriv(algorithm, generateKey(secretKey), iv);
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
    return decrpyted.toString('utf-8')
});
