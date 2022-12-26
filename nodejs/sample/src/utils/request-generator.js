const axios = require("axios");

class RequestGenerator {

    #reqData

    constructor() {
        this.#reqData = {};
    }

    origin(baseURL) {
        this.#reqData.baseURL = baseURL;
        return this;
    }

    method(method) {
        this.#reqData.method = method;
        return this;
    }

    url(url) {
        this.#reqData.url = url;
        return this;
    }

    header(headers) {
        this.#reqData.headers = {
            ...this.#reqData.headers,
            ...headers,
        }
        return this;
    }

    authorization(token) {
        this.#reqData.headers = {
            ...this.#reqData.headers,
            Authorization: token,
        };
        return this;
    }

    body(data) {
        this.#reqData.data = data;
        return this;
    }

    getRequestData() {
        return this.#reqData;
    }

    request(){
        return axios({...this.#reqData});
    }
}

module.exports = RequestGenerator