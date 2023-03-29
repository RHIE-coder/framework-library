const test = require("@/model/test");

module.exports.route = async (req, res) => {
    test.cbCount += 1;
    console.log(test.cbCount);
    console.log(req.headers)
    console.log(req.body);
    res.send({msg: "success"}) 
}

// /api/tx-action/callback/:tx_action/:uuid/:txid