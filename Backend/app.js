// SETUP //
const express = require('express');
const app = express();
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path')
const db = require('./db');
const port = process.env.PORT || 4001;
var cookieSession = require('cookie-session')

// middleware mounted on all paths
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false}));
// app.use(cookieSession({
//     name: 'networkSessionCookie',
//     keys: [/* secret keys */],
  
//     // Cookie Options
//     maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }))

// remove "X-Powered-By: Express" from header
app.set('x-powered-by', false);

////// DEFINE FUNCTIONS FOR ROUTES //////
function all(req, res, next) {
    console.log(req.path)
    res.sendFile(path.resolve('../frontend/build' + req.path));
}

async function login(req, res, next) {
    //if(newCookie)
        //storeCookieInDatabase;
    userObject = await db.queryUserObject(req.body.username, req.body.password);
    networkObject = await db.queryNetworkObject(null, userObject.collection);
    //console.log(networkObject)
    response = {"userObject":userObject, "networkObject":networkObject};
    res.send(response);
}

////// REGISTER ROUTES //////
app.get('/', (req, res) => res.sendFile(path.resolve('../frontend/build/index.html')));
app.post('/api/login', login);
//app.post('/api/user', user);
app.all('*', all);

////// LAUNCH THE APPLICATION //////
app.listen(port, () => console.log(`Node.js server is running on port ${port}`));
