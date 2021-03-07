const express = require('express');
const router = express.Router(); //use router instead of app
const db = require('./db');
const {createError, errorTransform} = require("./error.js")
const path = require('path')

/**
 * Express Routes
 * @module 
 */

////// DEFINE FUNCTIONS FOR ROUTES //////
/**
 * Express.js callback function that returns static files in the '../frontend/build' directory
 * @param {object} req Express.js representation of HTTP request
 * @param {object} res Express.js representation of HTTP response
 * @param {function} next The next middleware function
 * @returns This function returns undefined
 */
function all(req, res, next) {
    console.log(req.path)
    res.sendFile(path.resolve('../frontend/build' + req.path));
    //res.sendFile(path.resolve('../4/frontend/build' + req.path));
}

/**
 * Express.js callback function that queries the database with sent loginObject.
 * Sets cookie and sends userObject on success. Sends error HTTP status code on failure.
 * @param {object} req Express.js representation of HTTP request
 * @param {object} res Express.js representation of HTTP response
 * @param {function} next The next middleware function
 * @return {Promise<void>}
 */
async function login(req, res, next) {
    try {
        userObject = await db.queryUserObject(req.body.username, req.body.password);

        req.session.loggedIn = true;
        req.session.userID = userObject._id
        req.session.collection = userObject.collection

        response = userObject;

        res.status(200).send(response)
    } catch(err) {
        throw errorTransform(err, 401, "Authentication Error")
    }
}

/**
 * Express.js callback function that clears cookie on success and sends error HTTP status code on failure.
 * @param {object} req Express.js representation of HTTP request
 * @param {object} res Express.js representation of HTTP response
 * @param {function} next The next middleware function
 * @return {Promise<void>}
 */
async function logout(req, res, next) {
    try {
        if(req?.session?.loggedIn != true) {
            throw createError(500, null, "Already logged out")
        }
        else {
            req.session.destroy()
            return res.status(200).end()
        }
    } catch(err) {
        throw errorTransform(err, 500, "Logging out error")
    }
}

/**
 * Express.js callback function that queries the database with sent userObject for new user request.
 * Sets cookie on success and sends error HTTP status code on failure.
 * @param {object} req Express.js representation of HTTP request
 * @param {object} res Express.js representation of HTTP response
 * @param {function} next The next middleware function
 * @return {Promise<void>}
 */
async function register(req, res, next) {
    try{
        if(req?.session?.loggedIn) {
            throw createError(500, null, "Cannot register new account while logged in")
        }
        else {
            userObject = await db.queryRegisterUser(req.body)

            req.session.loggedIn = true;
            req.session.userID = userObject._id
            req.session.collection = userObject.collection

            res.status(200).end()
        }
    } catch(err) {
        throw errorTransform(err, 500, "Registering new user error")
    }
}

/**
 * Express.js callback function that queries the database with cookie information and sent contactObject for add contact request.
 * Sends contactObject with non-null _id field on success. Sends error HTTP status code on failure.
 * @param {object} req Express.js representation of HTTP request
 * @param {object} res Express.js representation of HTTP response
 * @param {function} next The next middleware function
 * @return {Promise<void>}
 */
async function contactAdd(req, res, next) {
    try {
        if(!req?.session?.loggedIn) {
            throw createError(401, null, "Need to log in to add new contact")
        }
        console.log("rat")
        contactObject = await db.queryAddContact(req.session.collection, req.body);
        response = contactObject
        console.log("shim")
        console.log(response)
        return res.status(200).send(response)
    } catch(err) {
        throw errorTransform(err, 500, "Error adding contact")
    }
}

/**
 * Express.js callback function that queries the database with cookie information and sent contactObject for update contact request.
 * Sends contactObject with non-null _id field on success. Sends error HTTP status code on failure.
 * @param {object} req Express.js representation of HTTP request
 * @param {object} res Express.js representation of HTTP response
 * @param {function} next The next middleware function
 * @return {Promise<void>}
 */
async function contactUpdate(req, res, next) {
    try {
        if(!req?.session?.loggedIn) {
            throw createError(401, null, "Need to log in to update contact")
        }

        await db.queryUpdateContact(req.session.collection, req.body);
        return res.status(200).end()
    } catch(err) {
        throw errorTransform(err, 500, "Error updating contact")
    }
}

/**
 * Express.js callback function that queries the database with cookie information and sent contactObject for contactDelete contact request.
 * Sends error HTTP status code on failure.
 * @param {object} req Express.js representation of HTTP request
 * @param {object} res Express.js representation of HTTP response
 * @param {function} next The next middleware function
 * @return {Promise<void>}
 */
async function contactDelete(req, res, next) {
    try {
        if(!req?.session?.loggedIn) {
            throw createError(401, null, "Need to log in to delete contact")
        }

        await db.queryDeleteContact(req.session.collection, req.body);
        return res.status(200).end()
    } catch(err) {
        throw errorTransform(err, 500, "Error deleting contact")
    }
}

/**
 * Express.js callback function that queries the database with cookie information core object request.
 * Sends coreObject on success. Sends error HTTP status code on failure.
 * @param {object} req Express.js representation of HTTP request
 * @param {object} res Express.js representation of HTTP response
 * @param {function} next The next middleware function
 * @return {Promise<void>}
 */
async function getCore(req, res, next) {
    try {
        if(!req?.session?.loggedIn) {
            throw createError(401, null, "Need to log in to get core")
        }
        networkObject = await db.queryNetworkObject(req.session.collection);
        userObject = await db.queryUserObjectWithID(req.session.userID);
        response = {"userObject":userObject, "networkObject":networkObject};
        return res.status(200).send(response);
    } catch(err) {
        throw errorTransform(err, 500, "Error getting core")
    }
}

/**
 * Wrapper for all mounted callbacks for catching errors and debugging
 * @param inputFunction
 * @return {function(*=, *=, *=): Promise<void>}
 */
function errorHandler(inputFunction) {
    return async function internal(req, res, next) {
        try {
            await inputFunction(req, res, next)
        } catch(err) {
            console.log("------INTERNAL---ERROR------\n")
            console.log(err?.internalErrorMessage)
            console.log("\n------EXTERNAL---ERROR------\n")
            console.log(err?.externalErrorMessage)
            console.log("\n----------------------------")
            res.status(err?.statusCode || 500).send(err?.externalErrorMessage || "")
        }
     }
}


////// REGISTER ROUTES //////
router.get('/', (req, res) => res.sendFile(path.resolve('../frontend/build/index.html')));
router.post('/api/login', errorHandler(login));
router.post('/api/logout', errorHandler(logout));
router.post('/api/register', errorHandler(register));
router.post('/api/contact/add', errorHandler(contactAdd));
router.post('/api/contact/update', errorHandler(contactUpdate));
router.post('/api/contact/delete', errorHandler(contactDelete));
router.post('/api/core', errorHandler(getCore));

router.all('*', all);

module.exports = router;
