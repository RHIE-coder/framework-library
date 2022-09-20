const Web3 = require("web3");
const fs = require("fs").promises;

const contractName = "SimpleStorage"

//read operation
async function getValueAtAddress(host, deployedContractAbi, deployedContractAddress) {
    const web3 = new Web3(host);
    const contractInstance = new web3.eth.Contract(deployedContractAbi, deployedContractAddress);
    const res = await contractInstance.methods.get().call();
    console.log("Obtained value at deployed contract is: " + res);
    return res
}

//write operation
async function setValueAtAddress(host, accountAddress, value, deployedContractAbi, deployedContractAddress) {
    const web3 = new Web3(host);
    const contractInstance = new web3.eth.Contract(deployedContractAbi, deployedContractAddress);
    const res = await contractInstance.methods.set(value).send({ from: accountAddress, gasPrice: "0x0", gasLimit: "0x24A22" });
    return res
}

(async()=>{
    const abi = JSON.parse(await fs.readFile(`${contractName}_sol_${contractName}.abi`))

    const getValue = await getValueAtAddress(
        "http://10.0.2.15:8545",
        abi,
        "0x6410E8e6321f46B7A34B9Ea9649a4c84563d8045",
    )

    console.log(getValue);
    
    const setValue = await setValueAtAddress(
        "http://10.0.2.15:8545",       
        "0xc9c913c8c3c1cd416d80a0abf475db2062f161f6",
        300,
        abi,
        "0x6410E8e6321f46B7A34B9Ea9649a4c84563d8045",
    )
    
    console.log(setValue);

    await getValueAtAddress(
        "http://10.0.2.15:8545",
        abi,
        "0x6410E8e6321f46B7A34B9Ea9649a4c84563d8045",
    )
})()