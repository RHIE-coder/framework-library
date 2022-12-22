module.exports = (req, res) => {
    console.log("callback request is invoked")

    console.log(req.body);
    res.send({msg:'success'})
}