// SETUP //
const express = require('express');
const app = express();
const cors = require('cors');
const https = require('https');
const fs = require('fs');
// const path = require('path')
// const db = require('./db');
const router = require('./Backend/routes')
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

// serve static files from the React frontend app

app.use(express.static(path.join(__dirname, '../4/frontend/build')))

// any files that don't match the above, send back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../4/frontend/build/index.html'))
})

// remove "X-Powered-By: Express" from header
app.set('x-powered-by', false);

////// LAUNCH THE APPLICATION //////
app.listen(port, () => console.log(`Node.js server is running on port ${port}`));
