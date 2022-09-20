const path = require('path');
const fs = require('fs');
const Web3 = require("web3");

// use the existing Member1 account address or make a new account
const address = "0xc9c913c8c3c1cd416d80a0abf475db2062f161f6";

// read in the contracts
const contractJsonPath = path.resolve(__dirname, 'SimpleStorage.json');
const contractJson = JSON.parse(fs.readFileSync(contractJsonPath));
const contractAbi = contractJson.abi;
const contractByteCode = contractJson.bytecode;

async function createContract(host, contractAbi, contractByteCode, contractInit, fromAddress) {
    const web3 = new Web3(host)
    const contractInstance = new web3.eth.Contract(contractAbi);
    const ci = await contractInstance
        .deploy({ data: '0x' + contractByteCode, arguments: [contractInit] })
        .send({ from: fromAddress })
        .on('transactionHash', function (hash) {
            console.log("The transaction hash is: " + hash);
        });
    return ci;
};

// create the contract
async function main() {
    // using Member1 to send the transaction from
    createContract("http://10.0.2.15:8545", contractAbi, contractByteCode, 47, address)
        .then(async function (ci) {
            console.log("Address of transaction: ", ci.options.address);
        })
}

main();