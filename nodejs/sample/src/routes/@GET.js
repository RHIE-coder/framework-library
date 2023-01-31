module.exports.route = async (req, res) => {
    req.app.set("cbCount", 0);
    res.render('index.html');
}