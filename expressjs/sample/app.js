const express = require('express');
const app = express();
const http = require('http');

app.get('/', (req, res) => {
    res.send({result:'Hello World'});
})

http.createServer(app).listen('3344', ()=> console.log('server is running'));