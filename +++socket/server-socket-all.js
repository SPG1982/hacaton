const express = require("express");
const http = require("http");
const app = express();
// const server = http.createServer(app);

let fs = require('fs');
//var app = require('express')();
let https = require('https');
let server = https.createServer({
    key: fs.readFileSync('./user.txt'),
    cert: fs.readFileSync('./server.txt'),
    ca: fs.readFileSync('./ca.txt'),
    requestCert: false,
    rejectUnauthorized: false
}, app);

const socket = require("socket.io");
const io = socket(server);

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

const users = {};

io.on('connection', socket => {

    socket.on('GPS', ({ user, x, y }, callback) => {
        //callback(X);
        socket.broadcast.emit('BROADCAST:GPS', { 'user': user, 'x': x, 'y': y });
        console.log(user, x, y)
    });

    if (!users[socket.id]) {
        users[socket.id] = socket.id;
    }
    console.log(socket.id)
    socket.emit("yourID", socket.id);
    io.sockets.emit("allUsers", users);
    socket.on('disconnect', () => {
        delete users[socket.id];
    })

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
    })

    socket.on("acceptCall", (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
    })
});

server.listen(9000, () => console.log('server is running on port 9000'));