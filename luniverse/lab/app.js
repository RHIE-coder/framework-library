const { v4: uuidv4 } = require('uuid');
const myUUID = uuidv4();
console.log(myUUID);
const RequestGenerator = require('./request-generator');

(async()=>{
    const apiKey = ''

    const req = new RequestGenerator()
        .origin('https://api.luniverse.io')
        .method("POST")
        .url("/tx/v2.0/transactions/StoreNumber")
        .authorization(`Bearer ${apiKey}`)
        .body({
            txId: myUUID,
            from: "",
            inputs: {
                num: 111,
                message: "hello world",
            },
        })

    const res = await req.request();

    console.log(res.data.data);
})()
