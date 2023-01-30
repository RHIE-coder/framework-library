module.exports.route = async (req, res) => {
    const acceptHeader = req.headers.accept;
    console.log(acceptHeader);
    res.send({
        greeting: "hello world",
    })
}