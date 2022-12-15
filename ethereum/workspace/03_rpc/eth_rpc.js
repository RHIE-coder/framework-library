const axios = require('axios');

class JsonRpcRequester {
    #baseURL;
    #axios;

    constructor(baseURL) {
        this.#baseURL = baseURL;
        this.#axios = axios.create({baseURL});
    }

    get baseURL() {
        return this.#baseURL;
    }

    async request(req) {
        const body = { jsonrpc: "2.0", ...req};
        return (await this.#axios.post("/", body)).data;
    }
}

(async() => {
   const rpc = new JsonRpcRequester('http://localhost:8545');
   
//    https://openethereum.github.io/JSONRPC-eth-module#eth_estimategas
//     https://ethereum.github.io/execution-apis/api-documentation/

})()