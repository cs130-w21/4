// SETUP //
const express = require('express');
const app = express();
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const port = process.env.PORT || 4001;

app.use(cors());

// middleware mounted on all paths
app.use(express.json()); 
app.use(express.urlencoded({ extended: false}));

// remove "X-Powered-By: Express" from header
app.set('x-powered-by', false);

////// DEFINE FUNCTIONS FOR ROUTES //////
function root(req, res, next) {
    next();
}

////// REGISTER ROUTES //////
app.get('/', root);

////// LAUNCH THE APPLICATION //////
app.listen(port, () => console.log(`Node.js server is running on port ${port}`))