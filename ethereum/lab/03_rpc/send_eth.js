const axios = require('axios');

class JsonRpcRequester {
    #baseURL;
    #axios;

    constructor(baseURL) {
        this.#baseURL = baseURL;
        this.#axios = axios.create({ baseURL });
        this.id = 1;
    }

    get baseURL() {
        return this.#baseURL;
    }

    async request(req) {
        if (!req.id) {
            req.id = this.id;
            ++this.id;
        }
        req.params = req.params ? req.params : [];
        const body = { jsonrpc: "2.0", ...req };
        return (await this.#axios.post("/", body)).data;
    }
}

(async()=>{
    const rpc = new JsonRpcRequester('http://192.168.100.73:8545')
    const { ethers } = require("ethers");
    const provider = new ethers.providers.JsonRpcProvider('http://192.168.100.73:8545');
    const privateKey = '0xded81d770d57dae1dd58f1ebb4912e293bbbd010a7fcfd428bbb5f16dc18b92a';
    const signer = new ethers.Wallet(privateKey, provider);
    method = 'eth_accounts';
    console.log(method);
    const eth_accounts = await rpc.request({
        method,
        params: [],
    });
    console.log(eth_accounts);
    console.log('---------------------');

    method = 'eth_sendTransaction';
    console.log(method);
    const eth_sendTransaction = await rpc.request({
        method,
        params: [
            {
                from: eth_accounts.result[1],
                to: eth_accounts.result[2],
                value: '0x' + (Math.pow(10, 17)).toString(16),
            }
        ],
    });
    console.log(eth_sendTransaction);

    console.log(" ---- RECEIPT ---- ")
    setInterval(async()=>{
        const receiptInfo = await rpc.request({
            method: 'eth_getTransactionReceipt',
            params:[eth_sendTransaction.result],
        })
        console.log(receiptInfo); // 없으면 result는 null이다.
    }, 1000)
    console.log(' --- result ---');
    const account1 = await rpc.request({
        method: 'eth_getBalance',
        params: [eth_accounts.result[1]],
    })
    const account2 = await rpc.request({
        method: 'eth_getBalance',
        params: [eth_accounts.result[2]],
    })
    console.log("Bob: ", account1, parseInt(account1.result, 16));
    console.log("Charlie: ", account2, parseInt(account2.result, 16));
    console.log('---------------------');
    // method = 'eth_getTransactionCount';
    // console.log(method);
    // const eth_getTransactionCount = await rpc.request({
    //     method,
    //     params: [eth_accounts.result[2]]
    // });
    // console.log(eth_getTransactionCount, parseInt(eth_getTransactionCount.result, 16));
    // console.log('---------------------');
    
    // const signed_tx = await signer.signTransaction({
    //     to: eth_accounts.result[1],
    //     value: '0x' + (Math.pow(10, 18)).toString(16),
    //     gasPrice: 21000,
    //     gasLimit: 3000000,
    //     nonce: eth_getTransactionCount.result,
    // })
    // console.log("signed Transaction: " + signed_tx);

    // console.log('---------------------');
    // method = 'eth_sendRawTransaction';
    // console.log(method);
    // const eth_sendRawTransaction = await rpc.request({
    //     method,
    //     params: [signed_tx]
    // });
    // console.log(eth_sendRawTransaction); // the transaction hash, or the zero hash if the transaction is not yet available.

    
    // console.log('---------------------');
    // setInterval(async()=>{
    //     method = 'eth_getTransactionByHash';
    //     console.log(method);
    //     const eth_getTransactionByHash = await rpc.request({
    //         method,
    //         params: [eth_sendRawTransaction.result]
    //     })
    //     console.log(eth_getTransactionByHash)
    //     /* Until
    // blockHash: '0x763a9747363e95be77dd5a44089e266e5e485b11dfcbf6cba0b248f15324c83f',
    // blockNumber: '0x120',
    // transactionIndex: '0x1',  
    //     */
    // }, 1000)
})()








