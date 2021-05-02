const express = require("express");
const http = require("http");
const app = express();
let fs = require('fs');
let https = require('https');
let server = https.createServer({
    key: fs.readFileSync('./user.txt'),
    cert: fs.readFileSync('./server.txt'),
    // ca: fs.readFileSync('./ca.txt'),
    requestCert: false,
    rejectUnauthorized: false
}, app);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});
app.use(express.json());

app.get('/', (req, res) => {
    res.redirect(`/1`)
  })


server.listen(9009, () => console.log('server is running on port 9009'));