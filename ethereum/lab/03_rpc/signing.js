(async()=>{
    

    const { ethers } = require("ethers");
    const account = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
    const signer = new ethers.Wallet(privateKey, provider);
    console.log(await provider.getBlockNumber()) 
    const accounts = await provider.listAccounts()
    console.log(accounts);
    const sign_tx = await signer.signTransaction({
        to: accounts[2],
        value: '0x' + (Math.pow(10, 18)).toString(16),
    })
    console.log(sign_tx);

    console.log('---------------------');

})()