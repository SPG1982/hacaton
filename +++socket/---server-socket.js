const express = require('express');
const app = express();
//const server = require('http').Server(app);
//const io = require('socket.io')(server);

let fs = require('fs');
//var app = require('express')();
let https = require('https');
let serverSocket = https.createServer({
    key: fs.readFileSync('./user.txt'),
    cert: fs.readFileSync('./server.txt'),
    ca: fs.readFileSync('./ca.txt'),
    requestCert: false,
    rejectUnauthorized: false
}, app);

const io = require('socket.io')(serverSocket);

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

io.on('connection', (socket) => {
    socket.on('GPS', ({ user, x, y }, callback) => {
        //callback(X);
        socket.broadcast.emit('BROADCAST:GPS', { 'user': user, 'x': x, 'y': y });
        console.log(user, x, y)
    });

    socket.on('join-room', (roomId, userId) => {
        console.log('Подключение')
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected', userId)
        

        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId)
            console.log(' user Disconnect')
        })

    })



});

app.get('/', (req, res) => {
    res.redirect(`/1`)
})

app.get('/:room', (req, res) => {
    // res.send("<h2>Привет Express!</h2>");
    // res.render('room', { })
})




serverSocket.listen(8887, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log('Сервер hacaton запущен!');
});