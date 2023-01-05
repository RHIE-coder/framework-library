module.exports.middleware = [
    async (req, res, next) => {
        console.log("two 1 middle")
        next();
    },
    async (req, res, next) => {
        console.log("two 2 middle")
        next();
    },
]

module.exports.route = async (req, res) => {
    res.send('two');
}