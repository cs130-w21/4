const express = require('express');
const router = express.Router(); //use router instead of app
const db = require('./db');
const {createError, errorTransform} = require("./error.js")
const path = require('path')

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
}

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

async function contactAdd(req, res, next) {
    try {
        if(!req?.session?.loggedIn) {
            throw createError(401, null, "Need to log in to add new contact")
        }

        await db.queryAddContact(req.session.collection, req.body);
        return res.status(200).end()
    } catch(err) {
        throw errorTransform(err, 500, "Error adding contact")
    }
}

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
