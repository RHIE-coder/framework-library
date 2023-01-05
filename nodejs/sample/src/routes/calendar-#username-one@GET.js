module.exports.middleware = async (req, res, next) => {
    console.log("one middle")
    next();
}

module.exports.route = async (req, res) => {
    res.send('one');
}