const {ResponseMessage} = require('@/utils/message')
const RequsetGenerator = require('@/utils/request-generator')

module.exports.middleware = (req, res, next) => {
    console.log('passed middleware')
    next();
}

module.exports.router = async (req, res) => {
    const requester = new RequsetGenerator()
    const authReq = requester.origin('http://localhost:3300')
             .method('POST')
             .url('/auth')
             .header({
                ['X-timestamp']: Date.now(),
                clientId: 'abcd1234',
             })
             .authorization('Bearer b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9')
             .body({
                service: 'member',
                id: 'rhie-coder',
                scope: 'login-history',
             })
   
    console.log(authReq.getRequestData())

    const resData = await authReq.request()

    console.log(resData.data);

    res.send(
        ResponseMessage.success()
    )
}