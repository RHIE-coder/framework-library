module.exports.route = async (req, res) => {
    let cnt = req.app.get("cbCount")
    cnt += 1;
    req.app.set("cbCount", cnt); 
    console.log(req.body);
    console.log(cnt);
    res.send({msg: "success"}) 
}