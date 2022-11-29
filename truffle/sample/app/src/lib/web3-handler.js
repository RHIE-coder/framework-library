const fs = require("fs/promises");
const path = require("path");
const Web3 = require("web3");

module.exports = class {
    /*  
        options {
            url(optional),
            contractAddress,
            accountAddress,
            abiPath,
            abiName,
        }
    */
    constructor(options){
        this.options = options;
        this.web3 = new Web3(this.options?.url ?? "http://localhost:8545");

    }

    async getInstance(){
        return new this.web3.eth.Contract(
                JSON.parse(await fs.readFile(path.join(this.options.abiPath, `${this.options.abiName}.json`))).abi, 
                this.options.contractAddress,
                {
                    from: this.options.accountAddress
                }
            )
    }
}
