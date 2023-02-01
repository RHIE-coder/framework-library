const test = require("@/model/test");

module.exports.route = async (req, res) => {
    test.cbCount = 0
    test.reqCount = 0
    res.send({
        reqCount: test.reqCount,
        cbCount: test.cbCount,
    })
}