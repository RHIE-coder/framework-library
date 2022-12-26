const {ResponseMessage} = require('@/utils/message');

module.exports.router = (req, res) => {
    res.send(ResponseMessage.success())
}