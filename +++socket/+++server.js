const express = require('express');
const app = express();
//const server = require('http').Server(app);
//const io = require('socket.io')(server);

var fs = require( 'fs' );
//var app = require('express')();
var https        = require('https');
var server = https.createServer({
    key: fs.readFileSync('./user.txt'),
    cert: fs.readFileSync('./server.txt'),
    ca: fs.readFileSync('./ca.txt'),
    requestCert: false,
    rejectUnauthorized: false
},app);

const io = require('socket.io')(server);


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

// --------------------
// var nsp = io.of('/my');
// nsp.on('connection', function(socket) {
//   console.log('someone connected');
//   nsp.emit('hi', 'Hello everyone!');
// });
//socket.broadcast.emit('broadcast', 'Another client has just connected!');
// ------------------------------


const rooms = new Map();


io.on('connection', (socket) => {

    socket.on('QUEST', ({ email, questTitle, slide }, callback) => {
        //callback(X); 
            socket.broadcast.emit('BROADCAST:QUEST', { 'email': email, 'title': questTitle, 'slide':slide });
            console.log(email, questTitle, slide)
    });

    socket.on('disconnect', () => {
        console.log(' user Disconnect')
    });

    // socket.on('test', (data, cb) => {cb('С сервера')});
    // socket.emit('message', 'You are connected!');
    // socket.broadcast.emit('message', 'Another client has just connected!');
    //console.log('user connected', socket.id);
});

server.listen(8889, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log('Сервер qpuzzle.ru запущен!');
});
