module.exports.route = async (req, res) => {
    console.log(res.body)
    res.send(req.body)
}