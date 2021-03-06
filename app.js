// SETUP //
const express = require('express');
const app = express();
const cors = require('cors');
const https = require('https');
const fs = require('fs');
// const path = require('path')
// const db = require('./db');
const router = require('./routes')
const port = process.env.PORT || 4001;
var cookieParser = require('cookie-parser')
var session = require('express-session');
const path = require('path')

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
app.use(router);

// remove "X-Powered-By: Express" from header
app.set('x-powered-by', false);

////// LAUNCH THE APPLICATION //////
app.listen(port, () => console.log(`Node.js server is running on port ${port}`));
