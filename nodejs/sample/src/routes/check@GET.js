const test = require("@/model/test")
module.exports.route = async (req, res) => {
    res.send({
        reqCount: test.reqCount,
        cbCount: test.cbCount,
    })

}