const test = require("@/model/test");

module.exports.route = async (req, res) => {
    test.cbCount += 1;
    console.log(test.cbCount);
    console.log(req.body);
    res.send({msg: "success"}) 
}