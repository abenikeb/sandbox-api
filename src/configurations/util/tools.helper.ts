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
export function prepareString(request){
       const data = request
       let string_applet=''
       for (var [key, value] of Object.entries(data)) {
            if (key=="sign" || key=="sign_type" || key=="header"|| key=="refund_info" || key=="openType"||key=="raw_request") {
                continue; 
            }
            if(key == "biz_content"){
                 for (var [k, v] of Object.entries(value)){
                    if(string_applet==""){
                        string_applet = k + "=" + v
                    }
                    else{
                        string_applet = string_applet + "&" + k + "=" + v
                    }
                 }
            }
            else{
                if(string_applet==""){
                        string_applet = key + "=" + value
                }
                else{
                        string_applet = string_applet + "&" + key + "=" + value
                }
            }
        }
        return sortedString(string_applet)
}
export function sortedString(string_applet){
    const stringExplode=""
    const sortedArray = string_applet.split("&")
    sortedArray.sort()
    return sortedArray.join("&")
}

export function SignWithRSA(data, key, sign_type = 'SHA256withRSA') {
    prepareString(data)
  if (sign_type === 'SHA256withRSA') {
    const keyBytes = Buffer.from(key, 'base64');
    const signer = crypto.createSign('RSA-SHA256');
    signer.update(data);
    const signature = signer.sign(keyBytes).toString('base64');
    return signature;
  }
}
export function verifySign(request,signature,publicKey){
  const data = prepareString(request)
  console.log("DATA \n",data)
  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(data);
  const result = verifier.verify(publicKey, signature, 'base64');
  console.log(result ? 'Signature is valid' : 'Signature is invalid');
  return result
}