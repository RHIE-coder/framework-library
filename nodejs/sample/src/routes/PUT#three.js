const Message = require('@/utils/format');
let data = require('@/utils/memory');

module.exports = async (req, res) => {
    data.num++;
    res.send(Message.success({
        data: `three-3 : ${data.num}`,
    }))
}