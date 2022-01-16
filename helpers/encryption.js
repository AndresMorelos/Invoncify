const crypto = require('crypto');

const algorithm = 'aes-256-ctr';

function encrypt({ secretKey, salt, message, iv }) {
    const cipher = crypto.createCipheriv(algorithm, generateKey(secretKey, salt), iv);
    const encrypted = Buffer.concat([cipher.update(message), cipher.final()]);

    return encrypted.toString('hex')
}

function decrypt({ content, secretKey, salt, iv }) {
    if(!content) return null;
    
    let returnValue;
    const decipher = crypto.createDecipheriv(algorithm, generateKey(secretKey, salt), iv);
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
    try {
        returnValue = JSON.parse(decrpyted.toString('utf-8'))
    } catch (error) {
        returnValue = null;
    }
    return returnValue
}


function generateKey(secretKey, salt) {
    return crypto.scryptSync(secretKey, salt, 32);
}

function generaterRandmBytes() {
    return crypto.randomBytes(16).toString('hex');
}

module.exports = {
    generaterRandmBytes,
    generateKey,
    encrypt,
    decrypt
}