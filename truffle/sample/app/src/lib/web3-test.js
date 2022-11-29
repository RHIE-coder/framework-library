const web3Handler = require("./web3-handler");

(async () => {
    options = {
        contractAddress:"0x255536Ed2E4d2bB8Fef58D26959F85146c79dD2a",
        accountAddress:"0x5fD31f16Da87cCB3D34CEC4F08FE4be090B8F04D",
        abiPath:"../../../truffle/build/contracts",
        abiName:"Storage",
    }
    const handler = new web3Handler(options);
    const contract = await handler.getInstance();
    const set_result = await contract.methods.setNumData(10).send();
    const get_result = await contract.methods.getNumData().call();
    console.log(set_result); 
    console.log(get_result);
})()

async function archive(){
    const Web3 = require("web3");
    const fs = require("fs/promises");
    const account = "0x5fD31f16Da87cCB3D34CEC4F08FE4be090B8F04D";
    const contract_address = '0xCb3B96104bE5aBfF42701C27105BDe1173f2221b';
    const web3 = new Web3("http://localhost:8545");
    const abi = JSON.parse(await fs.readFile("../truffle/build/contracts/Test.json"));
    const contract = new web3.eth.Contract(abi.abi, contract_address);
    const set_result = await contract.methods.setNumData(10).send({from:account});
    const get_result = await contract.methods.getNumData().call();
    console.log(set_result); 
    console.log(get_result);
}
