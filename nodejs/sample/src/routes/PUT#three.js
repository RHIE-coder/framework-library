const {ResponseMessage} = require('@/utils/message')

module.exports.router = (req, res) => {

    console.log(req.headers);
    console.log(req.body)

    res.send(ResponseMessage.success({
        data: "my secret history"
    }))    
}