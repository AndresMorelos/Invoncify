const crypto = require('crypto');
const appConfig = require('electron-settings')
const { ipcMain } = require('electron');


let iv;
const algorithm = 'aes-256-ctr';

iv = appConfig.getSync('iv');

if (!iv) {
    iv = crypto.randomBytes(16);
    appConfig.setSync('iv', iv.toString('hex'))
}


ipcMain.on('encrypt-data', (event, { message, secretKey }) => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(message), cipher.final()]);
    return encrypted.toString('hex');
})



ipcMain.on('decrypt-data', (event, { iv, content, secretKey }) => {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
    return decrpyted.toString();
});
