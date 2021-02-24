const express = require('express');
const router = express.Router(); //use router instead of app
const session = require('express-session');
const bcrypt = require('bcrypt');
const db = require('./db');
const path = require('path')

////// DEFINE FUNCTIONS FOR ROUTES //////
function all(req, res, next) {
    console.log(req.path)
    res.sendFile(path.resolve('../frontend/build' + req.path));
}

async function login(req, res, next) {
    //console.log(req.body.username, req.body.password)
    userObject = await db.queryUserObject(req.body.username, req.body.password);

    if(userObject == null) {
        return res.status(401).end()
    }

    req.session.loggedIn = true;
    req.session.userID = userObject._id
    req.session.collection = userObject.collection

    response = userObject;

    res.status(200).send(response)
}

async function logout(req, res, next) {
    //console.log(req.headers)
    if(req.session.loggedIn != true) {
        return res.status(200).end()
    }
    else {
        req.session.destroy()
        return res.status(200).end()
    }
}


async function contactAdd(req, res, next) {
    await db.queryAddContact(req.session.collection, req.body);
    return res.status(200).end()
}

async function contactUpdate(req, res, next) {
    await db.queryUpdateContact(req.body);
    return res.status(200).end()
}

async function contactDelete(req, res, next) {
    await db.queryDeleteContact(req.body);
    return res.status(200).end()
}

async function getCore(req, res, next) {
    //await db.queryGetCore(req.body); //TODO req.body.username, req.body.password
    userObject = await db.queryUserObjectWithID(req.session.userID);
    networkObject = await db.queryNetworkObject(req.session.collection)
    response = {"userObject":userObject, "networkObject":networkObject};
    return res.status(200).send(response);
}

function errorHandler(inputFunction, errorCode) {
    return function internal(req, res, next) {
        try {
            inputFunction(req, res, next)
        } catch {
            res.status(errorCode).end()
        }
     }
}


////// REGISTER ROUTES //////
router.get('/', (req, res) => res.sendFile(path.resolve('../frontend/build/index.html')));
router.post('/api/login', errorHandler(login, 401));
router.post('/api/logout', errorHandler(logout, 500));
router.post('/api/contact/add', errorHandler(contactAdd, 500));
router.post('/api/contact/update', errorHandler(contactUpdate, 401));
router.post('/api/contact/delete', errorHandler(contactDelete, 401));
router.post('/api/core', errorHandler(getCore, 401));

router.all('*', all);

module.exports = router;
