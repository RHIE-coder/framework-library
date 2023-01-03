const jwt = require('jsonwebtoken');

const symmetricKey = "mysecret"

const token = jwt.sign({
    data: "hello world",
}, symmetricKey)

console.log(token);

console.log("=====")

const headerBase64 = token.split('.')[0]
const payloadBase64 = token.split('.')[1]
const signatureBase64 = token.split('.')[2]

console.log(headerBase64)
console.log(payloadBase64)
console.log(signatureBase64)

console.log("=====")

const headerBuffer = Buffer.from(headerBase64, "base64");

console.log(headerBuffer.toString('utf8'))
console.log(Buffer.from(payloadBase64, 'base64').toString('utf8'))
console.log(Buffer.from(signatureBase64, 'base64').toString('utf8'))