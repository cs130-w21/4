//returns a properly formatted error object
//statusCode: the HTTP status code to be sent in the response
//internalErrorMessage: error to be printed for debugging purposes, often contains stack trace
//externalErrorMessage: plaintext to be sent back to the user in body of HTTP message
function createError(statusCode, internalErrorMessage, externalErrorMessage) {
    return {statusCode: statusCode, internalErrorMessage: internalErrorMessage, externalErrorMessage: externalErrorMessage}
}

//checks if error object is properly formatted and transforms it if not.
//if it is properly formatted it is returned unmodified
//if it is not properly formatted it will be used as the internalError in a new properly formatted error object along with the supplied statusCode and externalErrorMessage
function errorTransform(err, statusCode, externalErrorMessage) {
    //console.log(err)
    if (!("statusCode" in err) || !("internalErrorMessage" in err) || !("externalErrorMessage" in err)) {
        return {statusCode: statusCode, internalErrorMessage: err, externalErrorMessage: externalErrorMessage}
    }
    else {
        return err
    }
}

module.exports = {createError, errorTransform};