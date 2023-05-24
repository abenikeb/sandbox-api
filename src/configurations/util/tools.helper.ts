const uuid = require('uuid');
const crypto = require('crypto');

export function generateFabricAppKey() {
    return uuid.v1()
}
export function generateShortCode(){
     return Math.floor(
        Math.random() * (999999 - 1000) + 1000
        )
}
const characters ='abcdefgh0123456789';
function generateString(length:number,start:string='a') {
    let result = start;
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export function generateAppSecret(){
    return generateString(31);
}
export function generatePrepayId(){
    return generateString(37,"0");
}
export function generateFabricToken(){
    return generateString(32,"Bearer ");
}
export function generateNonceStr(){
    return generateString(32,"");
}
export function generateMerchantAppId(){
    return Math.floor(
        Math.random() * (999999999999999 - 100000000000000) + 100000000000000
        )
}

export function generateRSAKeyPairs(){
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: 'my-secret-passphrase'
  },
  hash: 'sha256'
});
return {privateKey,publicKey}
}