const axios = require('axios');

(async() => {
    const res = await axios({
        baseURL: 'http://172.22.11.249:3001',
        url: '/test',
        method: 'get',
        data: {
            greeting: 'hello world',
        }
    }) 
    console.log(res.data)
})()