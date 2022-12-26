class ResponseMessage {
    static success(args){
        return {
            code: 200,
            result: args?.msg ?? "success",
            data: args?.data ?? null,
        }
    }

    static error(args){
        return {
            code: args?.code ?? 404,
            result: args?.msg ?? "error",
        }
    }
}

module.exports = {
    ResponseMessage,
}