class Response {
    validationError(message) {
        return {
            statusCode: 422,
            error: "validation error",
            message: message
        }
    }

    apiError(message) {
        return {
            statusCode: 422,
            error: "api error",
            message: message
        }
    }
}

module.exports = new Response();
