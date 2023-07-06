import CryptoJS from 'crypto-js'
import { Buffer } from 'buffer'

export const AESEncrypt = (data, user) => {
    const enc = CryptoJS.AES.encrypt(data,user)
    return enc.toString()           
}

export const AESDecrypt = (data, user) => {
    const dec=CryptoJS.AES.decrypt(data,user)
    const str=dec.toString(CryptoJS.enc.Utf8)
    return str;
}

console.log(AESDecrypt("U2FsdGVkX19qZiIdLeH4DgycGE603fx37XLOkjbZ19s=", "Doari"));
