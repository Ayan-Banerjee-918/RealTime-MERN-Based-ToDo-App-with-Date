const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { secret_key, secret_iv, encryption_method } = require('./config');

const key = crypto
    .createHash('sha512')
    .update(secret_key)
    .digest('hex')
    .substring(0, 32);
const encryptionIV = crypto
    .createHash('sha512')
    .update(secret_iv)
    .digest('hex')
    .substring(0, 16);
  
const saltRounds = 10;
const AESEncrypt = (data) => {
    const cipher = crypto.createCipheriv(encryption_method, key, encryptionIV);
    return Buffer.from(
        cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64');
}

const AESDecrypt = (data) => {
    const buff = Buffer.from(data, 'base64');
    const decipher = crypto.createDecipheriv(encryption_method, key, encryptionIV);
    decrypt.setAutoPadding(false);
    return (
        decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
        decipher.final('utf8')
    )
}

generateHash=(pwd)=>{
    return AESEncrypt(bcrypt.hashSync(pwd, bcrypt.genSaltSync(saltRounds), null));
}

checkValidity=(pwd,salt)=>{
    return bcrypt.compareSync(pwd, AESDecrypt(salt));
}

module.exports = { generateHash, checkValidity };
