const {ResponseMessage} = require('@/utils/message');

module.exports.router = (req, res) => {
    console.log('---- one one one one ----');
    console.log(req._startTime)
    res.send(ResponseMessage.success())
    console.log(res._startTime)
}