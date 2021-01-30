// SETUP //
const express = require('express');
const app = express();
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path')
const port = process.env.PORT || 4001;

app.use(cors());

// middleware mounted on all paths
app.use(express.json()); 
app.use(express.urlencoded({ extended: false}));

// remove "X-Powered-By: Express" from header
app.set('x-powered-by', false);

////// DEFINE FUNCTIONS FOR ROUTES //////
function all(req, res, next) {
    console.log(req.path)
    res.sendFile(path.resolve('../frontend/build' + req.path));
}

////// REGISTER ROUTES //////
app.get('/', (req, res) => res.sendFile(path.resolve('../frontend/build/index.html')));
app.all('*', all);

////// LAUNCH THE APPLICATION //////
app.listen(port, () => console.log(`Node.js server is running on port ${port}`))