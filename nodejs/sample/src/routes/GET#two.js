const Message = require('../utils/format');

module.exports = async (req, res) => {
    res.send(Message.success({
        data: 'two-2',
    }))
}