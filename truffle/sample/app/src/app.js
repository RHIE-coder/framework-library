const web3Handler = require("./lib/web3-handler");

(async()=>{
    options = {
        contractAddress:"0x9B6C65FD86665CE7d9E300e50cc59da52af9Fd8A",
        accountAddress:"0x5fD31f16Da87cCB3D34CEC4F08FE4be090B8F04D",
        abiPath:`${__dirname}/../truffle/build/contracts`,
        abiName:"Storage",
    }
    const handler = new web3Handler(options);
    const contract = await handler.getInstance();
    const set_result = await contract.methods.setNumData(10).send();
    const get_result = await contract.methods.getNumData().call();
    console.log(set_result); 
    console.log(get_result);
    const result = await contract.methods.calculate().call();
    console.log(result);
})()

console.log("app");