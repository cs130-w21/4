/**
 * Backend Error Handling
 * @module
 */

/**
 * Returns a properly formatted error object
 * @param {number} statusCode HTTP status code to be sent in the response
 * @param {string} internalErrorMessage Error to be printed for debugging purposes, often contains stack trace
 * @param {string} externalErrorMessage Plaintext to be sent back to the user in body of HTTP message
 * @returns Returns an object packaged with the input parameters
 */
function createError(statusCode, internalErrorMessage, externalErrorMessage) {
    return {statusCode: statusCode, internalErrorMessage: internalErrorMessage, externalErrorMessage: externalErrorMessage}
}

/**
 * Checks if err object is properly formatted and transforms it into one using parameters if not.
 * @param {number} err Error object to test
 * @param {string} statusCode Status code to package into new errorObject if err is improperly formatted
 * @param {string} externalErrorMessage ExternalErrorMessage to package into new errorObject if err is improperly formatted
 * @returns If err is properly formatted it is returned unmodified.
 * If it is not properly formatted a new errorObject will be returned with 1) err as the internalError
 * 2) formal parameter statusCode as the statusCode and 3) formal parameter externalErrorMessage as the externalErrorMessage.
 */
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