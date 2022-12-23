const get = async(accessToken) => {
    if(accessToken === "123") {
        return {
            active : true,
        }
    }
}

const check = async(accessToken) => {
    try {
        const token = await get(accessToken);
        if (!token || token.active === false)
            throw new ReferenceError('123123123');
        return;
    } catch (e) {
        console.log("AUTH ERROR: ", e)
    } 
}

const auth = async(req, res, next) => {
    try {
         console.log(await check("111"));
         console.log('hlll')
    } catch (err) {
        console.log('hohoho')
        res.status(200).json({
            state: false,
            code: err.status,
            message: err.message,
        })
    }
}

module.exports = async (req, res) => {
    await auth(req, res);
    res.send({message: 'success'})
}