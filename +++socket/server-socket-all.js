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
const sockets = {};
let map = new Map();

io.on('connection', socket => {

    socket.on('GPS', ({ user, x, y }, callback) => {
        //callback(X);
        socket.broadcast.emit('BROADCAST:GPS', { 'user': user, 'x': x, 'y': y });
        console.log(user, x, y)
    });

    // if (!sockets[socket.id]) {
    //     sockets[socket.id] = socket.id;
    // }

    socket.emit("yourID", socket.id, (user) => {
        console.log('Ответ сокета User: ' + user)
        if (!map.has(user)) {
            map.set(user, socket.id)
        }

        if (!users[socket.id]) {
            console.log('Новый user ' + user)
            users[socket.id] = user;
        }

        // console.log(users)
        io.sockets.emit("allUsers", users);
        // console.log(Object.entries(users))

        let duplicate = {}
        // Object.entries(users).forEach(function (value, i) {
        //     value.forEach((v, k) => {
        //         if (!duplicate[v]) {
        //             duplicate[v] = 1;
        //         } else {
        //             duplicate[v] += 1
        //             delete users[k]
        //             console.log(users)
        //         }
        //     })
        // });

        for (key in users) {
            if (!duplicate[users[key]]) {
                duplicate[users[key]] = 1;
            } else {
                duplicate[users[key]] += 1
                delete users[key]
                console.log(users)
            }
        }
        console.log(users)

    });

    // console.log(sockets)
    // io.sockets.emit("allUsers", sockets);

    socket.on('disconnect', () => {
        console.log('Disconnect ' + socket.id)
        // delete sockets[socket.id]
        delete users[socket.id]
        io.sockets.emit("allUsers", users);
    })


    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit('hey', { signal: data.signalData, from: data.from });
    })

    socket.on("acceptCall", (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
    })

});

server.listen(9000, () => console.log('server is running on port 9000'));