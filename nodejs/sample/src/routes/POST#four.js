const Message = require('@/utils/format');

module.exports = async (req, res) => {

    try{
        throw new ReferenceError("my good!");
        res.send(Message.success({
            data:'four-4'
        }))
    }catch(err) {
        console.error(err.message);
        res.send(Message.error({
            msg: err.message
        }))
    }

}