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

(async () => {
    console.log(parseInt("16345785d8a0000", 16)); //100000000000000000
    console.log((100000000000000000).toString(16));
    const rpc = new JsonRpcRequester('http://192.168.100.73:8545');
    let method = '';

    method = 'eth_protocolVersion';
    console.log(method);
    const eth_protocolVersion = await rpc.request({
        method,
    });
    console.log(eth_protocolVersion);
    console.log('---------------------')

    method = 'eth_accounts';
    console.log(method);
    const eth_accounts = await rpc.request({
        method,
    });
    console.log(eth_accounts);
    console.log('---------------------')


    method = 'eth_blockNumber';
    console.log(method);
    const eth_blockNumber = await rpc.request({
        method,
    })
    console.log(eth_blockNumber, parseInt(eth_blockNumber.result, 16));
    console.log('---------------------')


    method = 'eth_chainId'
    console.log(method);
    const eth_chainId = await rpc.request({
        method,
    });
    console.log(eth_chainId, parseInt(eth_chainId.result));
    console.log('---------------------')

    /*  
    Returns the client coinbase address. The coinbase address is the account to pay mining rewards to.
    To set a coinbase address, start Besu with the --miner-coinbase option set to a valid Ethereum account address. 
    You can get the Ethereum account address from a client such as MetaMask or Etherscan.
    */
    method = 'eth_coinbase';
    console.log(method);
    const eth_coinbase = await rpc.request({
        method,
    })
    console.log(eth_coinbase);
    console.log('---------------------')


    // Returns the current price per gas in wei.
    method = 'eth_gasPrice';
    console.log(method);
    const eth_gasPrice = await rpc.request({
        method,
    })
    console.log(eth_gasPrice, parseInt(eth_gasPrice.result, 16));
    console.log('---------------------');


    method = 'eth_getBalance';
    console.log(method);
    const eth_getBalance = await rpc.request({
        method,
        params: [eth_coinbase.result],
        // params: [eth_accounts.result[0]],
    })
    console.log(eth_getBalance, parseInt(eth_getBalance.result));
    console.log('---------------------');


    // Creates new message call transaction or a contract creation, if the data field contains code.
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


    method = 'eth_estimateGas';
    console.log(method);
    const eth_estimateGas = await rpc.request({
        method,
        params: [
            {
                from: eth_accounts.result[1],
                to: eth_accounts.result[2],
                value: '0x' + (Math.pow(10, 18)).toString(16),
            }
        ]
    });
    console.log(eth_estimateGas, parseInt(eth_estimateGas.result, 16));
    console.log('---------------------');


    method = 'eth_getTransactionCount';
    console.log(method);
    const eth_getTransactionCount = await rpc.request({
        method,
        params: [eth_accounts.result[1]]
    });
    console.log(eth_getTransactionCount, parseInt(eth_getTransactionCount.result, 16));
    console.log(' --- other users --- ');
    console.log(
        parseInt((
            await rpc.request({
                method,
                params: [eth_accounts.result[0]]
            })
        ).result,
            16)
    );
    console.log(
        parseInt((
            await rpc.request({
                method,
                params: [eth_accounts.result[1]]
            })
        ).result,
            16)
    );
    console.log(
        parseInt((
            await rpc.request({
                method,
                params: [eth_accounts.result[2]]
            })

        ).result,
            16)
    );
    console.log(
        parseInt((
            await rpc.request({
                method,
                params: [eth_accounts.result[3]]
            })

        ).result,
            16)
    );
    console.log('---------------------');



    
    // Signs transactions without dispatching it to the network. It can be later submitted using eth_sendRawTransaction.
    method = 'eth_signTransaction';
    console.log(method);
    // const eth_signTransaction = await rpc.request({
    // method,
    // params: [
    //     {
    //         from: eth_accounts.result[1],
    //         to: eth_accounts.result[2],
    //         value: '0x'+(Math.pow(10,18)).toString(16),
    //     }
    // ]
    // });
    // console.log(eth_signTransaction);

    const { ethers } = require("ethers");
    const provider = new ethers.providers.JsonRpcProvider('http://192.168.100.73:8545');
    const privateKey = '0xa2d10670b32aee8a1e219c208b9f7564c4b824c3d851d36e7b8df3da4639581d';
    const signer = new ethers.Wallet(privateKey, provider);

    const signed_tx = await signer.signTransaction({
        to: eth_accounts.result[2],
        value: '0x' + (Math.pow(10, 18)).toString(16),
        gasPrice: 21000,
        gasLimit: 3000000,
        nonce: eth_getTransactionCount.result,
    })
    console.log(signed_tx);
    console.log('---------------------');

    // Creates new message call transaction or a contract creation for signed transactions.
    method = 'eth_sendRawTransaction';
    console.log(method);
    const eth_sendRawTransaction = await rpc.request({
        method,
        params: [signed_tx]
    });
    console.log(eth_sendRawTransaction); // the transaction hash, or the zero hash if the transaction is not yet available.
    // console.log('---------------------');
    // console.log('continue... but error will be occured');
    // console.log(await rpc.request({
    //     method,
    //     params: [signed_tx]
    // }));
    // console.log(await rpc.request({
    //     method,
    //     params: [signed_tx]
    // }));
    // console.log(await rpc.request({
    //     method,
    //     params: [signed_tx]
    // }));
    console.log('---------------------');

    // The sign method calculates an Ethereum specific signature with: sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))).
    method = 'eth_sign';
    console.log(method);
    const eth_sign = await rpc.request({
        method,
        params: [
            eth_accounts.result[1],
            "0x5363686f6f6c627573", // Schoolbus
        ]
    });
    console.log(eth_sign);
    console.log('---------------------');

    




















    /* 
     Executes a new message call immediately without creating a transaction on the block chain. 
     
     - About Transaction
     https://openethereum.github.io/JSONRPC.html#transactions
       
       to : Contract Address
    */
    // method = 'eth_call';
    // console.log(method);
    // const eth_call = await rpc.request({
    //     method,
    //     params: [{
    //         from: eth_accounts.result[1],
    //         to: eth_accounts.result[2], //contract address
    //         value: '0x' + (100).toString(16),
    //     }]
    // })
    // console.log(eth_call);
    // console.log(eth_accounts.result[0])
    // console.log(eth_accounts.result[1])
















    //    https://openethereum.github.io/JSONRPC-eth-module#eth_estimategas
    //     https://ethereum.github.io/execution-apis/api-documentation/

})()