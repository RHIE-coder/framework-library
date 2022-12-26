const {ResponseMessage} = require('@/utils/message');

module.exports.middleware = [
    (req, res, next) => {
        console.log('111')
        next();
    },
    (req, res, next) => {
        console.log("222");
        next()
    }
]

module.exports.router = (req, res) => {


    res.send(
        ResponseMessage.success()
    )
}