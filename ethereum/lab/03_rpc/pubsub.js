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

(async()=>{
    
})()