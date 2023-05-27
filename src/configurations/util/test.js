const crypto = require('crypto');
const { request } = require('http');

function prepareString(request){
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
function sortedString(string_applet){
    const stringExplode=""
    const sortedArray = string_applet.split("&")
    sortedArray.sort()
    return sortedArray.join("&")
}

function SignWithRSA(data, key, sign_type = 'SHA256withRSA') {
    prepareString(data)
  if (sign_type === 'SHA256withRSA') {
    const keyBytes = Buffer.from(key, 'base64');
    const signer = crypto.createSign('RSA-SHA256');
    signer.update(data);
    const signature = signer.sign(keyBytes).toString('base64');
    return signature;
  }
}
testRequest={
   "timestamp": "4567890987",
    "nonce_str": "098767890",
    "method": "payment.preorder",
    "version": "1.0",
    "biz_content":{
    "notify_url": "https://www.google.com",
    "appid": "796870989311752",
    "merch_code": "161194",
   "merch_order_id": "00000000",
    "trade_type": "Checkout",
    "title": "title",
    "total_amount": "amount",
    "trans_currency": "ETB",
    "timeout_express": "120m",
    "business_type": "BuyGoods",
    "redirect_url": "https://www.bing.com/",
    "callback_info": "From web"
    },
    "sign": "eH6SzJpqWDNsXLJ/J3xZsN9CxKhaknpLnl4Ns33SnKd6waeF69uOMjqdTH7jREZiBIG/hG7yvhgIx70D5cv6wzjEONjuRuuiSRZ2skCdftj19o/cT1KOvIwbtUWIh9xwl31JgPI52NVjpslsDf28b8wh8NjtVHW1CLCPsbve++s8I3v64wWyHvQtobAfrvXDmjFFvR2fjn9qohEn5rlbhHk1oTVM0h/IeOdC/lJN8t77xEVYLGmvZLZ6L9xnFJUW4USGA07MTqyGp6UDuweIrkXtrHA8PSE1IDT1ixp5KkdDTdD+JxJRW57OT4iIZ5nhJheES5ouhH0MruHqz/C/Uw==",
  "sign_type": "SHA256WithRSA"
}
key="-----BEGIN ENCRYPTED PRIVATE KEY-----\nMIIFLTBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQIXwWA8NkUCaMCAggA\nMAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBDH0sS93mtvHVCiSiStFsdiBIIE\n0JxUH+zrpBAmELbXVtLXGtIl2yUVLTrBskAomUWHX/dz2XgvzU8G+EuePCULDJUa\ney5CQg6SC+c6DCoErxhxGT5P7UXm485yky0GUGA3vH4bJ41gljC4E0X+CuFSuiwS\nDVC8h0mPFcrev4kWEGvsw1iy5UhP4wMJJJhVLW4W/rVi70AJq8zZ7/g5h6HcWLo5\nLmy8tUStSgmDhwDWOa2TqPmYGo0rMJnQ2psdJsvoONJPt4jk3KF6SEYv8yCHeFjj\noC5KayzahBYdMxkzkq8lNPUmWkq3//mHCTmjlsV+VdsGDxaVRDkNvVnUC8R73vvC\nT8GuoyKxNzNxZF/JkNz2py8jBcLL/SAXJi/Lfd3UT2xYidr5iE/rmal6nCMC0ZVC\nqtoe1mBzzoIgd6zmQVAdE75uGgjNkJEg90YiwLcLpD8v0kZxA2t+Sje47LpDI0Wc\ni5CLTlbuXvgngqeMlukftfP2K3pgKpnaaveCZjzolCL4NQHQ3qbBQziROKQS9F4O\nnVgfBXbNYMEJeKRfTr1ddo+JnuFxKrYNMOukvGQVvxjl1KrM30Aep2y1dMr6C0y4\nNIn8OnaMLXb+0nypCojpT/IeFDsIDQdKbdGRdBhM4zmApwFEgx8K5IAGtN1cyD7Z\n9fuqqG4q5jCCxEazkPo/hO3MJ+c/9C2aDoOpQCwMFbv6TIkeBteQclIvtih8SoJR\ncQqXBKTOp6uSQLzsGVfCpuYzrHM3edPmKZM3cMJRILjKNamZRln/kS0uqIGS1689\n3iHNo5KxIdV468vZ9jHzJkjilx66ohLjX7+d6uE5TU0BKY4JMeOY97iRUqoisU/y\nTTwKCiUynNp/3P748OSofuy5+w4aEeDQayGZzrOTTto5jVedPVzwjYiGDaVdOEmK\nEiAiYgRQ0Qu8KwDPrRZ7f+FSZwXVex0NAIcvSLRRLvBvEvIv0dztVcvbF22CsAU2\n0aC68JJSJLvc/+AkK9ut/H/nAGz3a6FxxEWZ1T4TnicZjScZQ05d+oDIdQdZS8cp\nAsF+Txd6gk3gOpWGb28wz0C9a21I40mGWaYr8C0X7wyX4D5CJ2CBgsdz+yAfQZEN\nnJYM4+crm+LZKuJRtABG34LxihUTIVyQ/miQfdtl2YjFGygJOcieSkhwcuT8eUbg\nX+HJaNnKBvM3UMFDa1GguZCuBzWli5/jgCajV6AcF1K2xajfMl5ke0NqkqlkLlWR\nSr/d3brOStCSvcuzu/3x2nwWE40bqOvwz5MyiCuEfGP28A7Aem30msC87Bsa6LTG\nJuydTSGoupUoThI8ptxM8zkmBfGewIyMsGHFAOkREbL0++S/Q36ssRiPhjwjLrRe\n11OKdmz5WYcFYKqQdjBbdC39DgVW5ukowgXp3aUnO/h5B19YdhvH5FbWzVkYgzpj\nta76FAcriAztIXCWmK9vnaCdwNk3BbTuoX58+1XrpO4g9YbnuPSWwliw7rtsyk9p\nvx/4Uw0AHgnRK1rUUBzUD2SiUqD0kco9/p5/CLyu4dXrMTGPHhJxMSHeu9uf2ig2\nF/9NTHMtGm3Vtpbfj5H65+tSU6vcxb6YNq+PVsuXqD2mPVjGUxv/t0fgmNxvfrp5\n9wiRGPV5vnr49sQ2CQ3OXkwvOEA9BT0xCPaj99PkkmcH\n-----END ENCRYPTED PRIVATE KEY-----\n".trim()
console.log( SignWithRSA(testRequest,key))


const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4...... (public key goes here)
-----END PUBLIC KEY-----`;

const data = 'This is the data to be signed';

const signature = '...'; // replace with the actual signature

const verifier = crypto.createVerify('RSA-SHA256');
verifier.update(data);
const result = verifier.verify(publicKey, signature, 'base64');

console.log(result ? 'Signature is valid' : 'Signature is invalid');

const test={
   "timestamp": "4567890987",
    "nonce_str": "098767890",
    "method": "payment.preorder",
    "version": "1.0",
    "biz_content":{
    "notify_url": "https://www.google.com",
    "appid": "796870989311752",
    "merch_code": "161194",
   "merch_order_id": "00000000",
    "trade_type": "Checkout",
    "title": "title",
    "total_amount": "amount",
    "trans_currency": "ETB",
    "timeout_express": "120m",
    "business_type": "BuyGoods",
    "redirect_url": "https://www.bing.com/",
    "callback_info": "From web"
    },
    "sign": "eH6SzJpqWDNsXLJ/J3xZsN9CxKhaknpLnl4Ns33SnKd6waeF69uOMjqdTH7jREZiBIG/hG7yvhgIx70D5cv6wzjEONjuRuuiSRZ2skCdftj19o/cT1KOvIwbtUWIh9xwl31JgPI52NVjpslsDf28b8wh8NjtVHW1CLCPsbve++s8I3v64wWyHvQtobAfrvXDmjFFvR2fjn9qohEn5rlbhHk1oTVM0h/IeOdC/lJN8t77xEVYLGmvZLZ6L9xnFJUW4USGA07MTqyGp6UDuweIrkXtrHA8PSE1IDT1ixp5KkdDTdD+JxJRW57OT4iIZ5nhJheES5ouhH0MruHqz/C/Uw==",
  "sign_type": "SHA256WithRSA"
}
const sign="i1ddPg4Wy1jx7h7tjW3g5sa20bvYpKIxh8Sbjiwh9s7kcg+FHf3WoiO0I6TIMwICLgW57pqCwh3CiGWSkshdjeCgjBrQE1AbmG9KeRQdypZl5OwijcYT79Ll1vyoHShpnMbMiS7p89zFgf4i2Su3o5txB09CpPVe+gPbBiUzGUpGkalUYjsx9YX8mvHfWUnvJsydSlMd7xsCNJQrs4rRqneek67qDrcvp2rN/NvkctHOPLpdNfKLfacDLsLn4JFmHmsj2pfbxC+li07w6Zk6LRq88Y1ZrowXuWr9Dbqk3Mq0mZH84Ftz+au3J+e/gab4LCi5XMZNQ1DTLij1mwXTjWVG4RzinJ3zjfUk5VuwTRAV/dQL7HvMk7ak45/ToV+AvXM8OdWXtE70xPJqDAwxql7AXe+JoUCBMFNzLNG0A6fa1QYWrkvegyZ3tOxn4UDh34bTcgM47YYfdtO/L4NI0OvuDCLXeQnfwoDwQvz/pLOdMFCJGfkELvrdfI6YOTf4"
const pub_key="MIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEAlIyC236rU5qZ6P321w7bfugWykcCMh/nFqobTMq+2pHBO8v7g90Dr5961N7Q7iktaDFKKWw+vxRw3ZmlL+XIKJlfM//1SGMbuTxJ9lDR6P8mNk9C1D2k0o7elUiMBJWg99gT5JwOo6hP757U15qHDNUmzww+KW8tMgLozuMjwg6A6l0LDjCrDq9MGZ61s9leUAG9VuDBIvSgTS1p0P41fuaUEIRm5ELtHkhbgua7Qf0pushhM5ALswZbkVj744iTsP8Vl7ejTCa8PL+DeGawkurt67lgvscMlCswfCac1VXYE7HHP2FTSN0HcsyDVGrV2xPzUubrZKxuEpkfFUFh8YRUCXGMiraQN+Ja3TorG/FiLTTzt8o7UgiQcJ/lcMBpzVQB7fm3ho+z4NUkf+QUDlZbfVKWeJ+0BvOUylqxC2IpysHOUW2zRXEKD2HmVf/kxyP75L77l3j2h7RIUu7GgAZ/yoUTiCedkyJuCglG9lqGvrFOMXfX5CzCdmar56f3AgMBAAE="
function verifySign(request,signature,publicKey){
  const data = prepareString(request)
  console.log("DATA \n",data)
  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(data);
  const result = verifier.verify(publicKey, signature, 'base64');
  console.log(result ? 'Signature is valid' : 'Signature is invalid');
}
verifierSign(test,sign,pub_key)