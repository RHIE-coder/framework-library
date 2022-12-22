const { v4: uuidv4 } = require('uuid');
const myUUID = uuidv4();
console.log(myUUID);
const RequestGenerator = require('./request-generator');

(async()=>{
    const callbackUrl = ''
    const akey = ''
    const skey = ''
    const req = new RequestGenerator()
        .origin('https://api.luniverse.io')
        .method("POST")
        .url("/tx/v2.0/auth-tokens")
        .body({
           accessKey: akey,
           secretKey: skey, 
        })

    const res = await req.request();

    console.log(res.data);
})()
