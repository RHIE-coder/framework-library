const Message = require('@/utils/format');
let data = require('@/utils/memory');

module.exports = async (req, res) => {

    data.num++;

    res.send(Message.success({
        data: `two-2 : ${data.num}`,
    }))
}