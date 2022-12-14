const { ethers } = require("ethers");

const account = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

(async()=>{
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
    const signer = new ethers.Wallet(privateKey, provider);
    console.log(await provider.getBlockNumber());
    const beforeTxBalance = await provider.getBalance(account);
    const StorageContract = new ethers.Contract(contractAddress, require('./abi'), signer);
    console.log(await StorageContract.store(111));
    console.log((await StorageContract.retrieve()).toString());
    const afterTxBalance = await provider.getBalance(account);
    console.log(beforeTxBalance.toString());
    console.log(afterTxBalance.toString());
})()