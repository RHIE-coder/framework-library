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

// {
//   environmentId: '1671409635142733210',
//   txId: 'd56175c8-21ab-4dde-99c3-4d6b2ed472b0',
//   txHash: '0xdb2bdcbb31dcce499482df940cc0df80e1c66c4f0f1b10999e255489ce04b062',
//   status: 'Success',
//   receipt: {
//     blockHash: '0x716cb93f4194915604f0112c7fdaa9dbd56cd085a56689b9500611def0d77d8e',
//     blockNumber: '0x535688',
//     contractAddress: null,
//     cumulativeGasUsed: '0x6b69',
//     effectiveGasPrice: '0x1388',
//     from: '0xd099426042ea772b823fe80d9ddc39693b42b601',
//     gasUsed: '0x6b69',
//     logs: [ [Object] ],
//     logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000010000000000040000000000200000400000100000000000000000000000000040000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
//     status: '0x1',
//     to: '0x7e48b7c121c04c1c1d56a27a5fe1b032beb2feaa',
//     transactionHash: '0xdb2bdcbb31dcce499482df940cc0df80e1c66c4f0f1b10999e255489ce04b062',
//     transactionIndex: '0x0',
//     type: '0x0'
//   }
// }