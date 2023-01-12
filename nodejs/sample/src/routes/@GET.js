module.exports.route = async (req, res) => {
    console.log(require('path').resolve())
    console.log(process.env.PROJECT_ROOT_PATH)
    console.log(process.env.USER_ARG)
    res.render('index.html');
}