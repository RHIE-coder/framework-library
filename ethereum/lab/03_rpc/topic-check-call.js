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

const contractAddress = '0x3172352441424b5624f4a0eaa3d7ff0c594b68a2';

(async()=>{
    const { ethers } = require("ethers");
    const provider = new ethers.providers.JsonRpcProvider('http://192.168.100.73:8545');
    const contract = new ethers.Contract(contractAddress, abi, provider);
    console.log(contract);
    const num = await contract.retrieve()
    console.log(num);
    let filter = contract.filters.storeHistory(101);
    console.log(filter);
    console.log(await provider.getLogs(filter))
})()