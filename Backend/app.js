// SETUP //
const express = require('express');
const app = express();
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path')
const db = require('./db');
const port = process.env.PORT || 4001;
var cookieParser = require('cookie-parser')
var session = require('express-session');

// middleware mounted on all paths
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'myUniqueKeyRatPotatoDog',
    resave: false,
    saveUninitialized: false,
    name: 'networkTrackerSession',
    cookie: {
        //1 day
        maxAge: 86_400_000,
    }
}))

// remove "X-Powered-By: Express" from header
app.set('x-powered-by', false);

////// DEFINE FUNCTIONS FOR ROUTES //////
function all(req, res, next) {
    console.log(req.path)
    res.sendFile(path.resolve('../frontend/build' + req.path));
}

async function login(req, res, next) {
    userObject = await db.queryUserObject(req.body.username, req.body.password);

    if(userObject == null) {
        return res.status(401).end()
    }

    req.session.loggedIn = true;
    req.session.db_username = userObject.db_username
    req.session.db_password = userObject.db_password

    networkObject = await db.queryNetworkObject(req.session.db_username, req.session.db_password, userObject.collection);
    response = {"userObject":userObject, "networkObject":networkObject};

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

////// REGISTER ROUTES //////
app.get('/', (req, res) => res.sendFile(path.resolve('../frontend/build/index.html')));
app.post('/api/login', login);
app.post('/api/logout', logout);
//app.post('/api/user', user);
app.all('*', all);

////// LAUNCH THE APPLICATION //////
app.listen(port, () => console.log(`Node.js server is running on port ${port}`));
