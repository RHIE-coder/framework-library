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

const abi =  [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "num",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "data",
          "type": "string"
        }
      ],
      "name": "storeHistory",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "retrieve",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "num",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "message",
          "type": "string"
        }
      ],
      "name": "store",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

const contractAddress = '0x3172352441424B5624F4a0eaA3d7fF0c594B68A2';

(async()=>{
    const { ethers } = require("ethers");
    const provider = new ethers.providers.JsonRpcProvider('http://192.168.100.73:8545');
    const privateKey = '0xa2d10670b32aee8a1e219c208b9f7564c4b824c3d851d36e7b8df3da4639581d';
    const ownerWallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const contractWithSigner = contract.connect(ownerWallet);
    const tx = await contractWithSigner.store(101, "world");
    console.log(tx.hash);
    setTimeout(async ()=>{
        console.log("sending...")
        const result = await tx.wait()
        console.log(result);
        console.log("FINISH~!")
        const num = await contract.retrieve()
        console.log(num);
   })
    // console.log("sending...")
    // const result = await tx.wait()
    // console.log(result);
    // console.log("FINISH~!")
})()