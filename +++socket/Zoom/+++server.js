const express = require('express')
const app = express()
// const server = require('http').Server(app)
const { v4: uuidV4 } = require('uuid')
var ExpressPeerServer = require('peer').ExpressPeerServer;

let path = require('path')

let fs = require( 'fs' );
let https        = require('https');
let server = https.createServer({
    key: fs.readFileSync('./user.txt'),
    cert: fs.readFileSync('./server.txt'),
    ca: fs.readFileSync('./ca.txt'),
    requestCert: false,
    rejectUnauthorized: false
},app);

const io = require('socket.io')(server)

app.set('view engine', 'ejs')
// app.set('views', 'public');
// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/peer', ExpressPeerServer(server, {debug:true}));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

  app.options('*', (req, res) => {
      res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
      res.send();
  });
});


app.get('/', (req, res) => {
  res.redirect(`/1`)
})

app.get('/:room', (req, res) => {
  // res.send("<h2>Привет Express!</h2>");
  res.render('room', { })
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})



server.listen(9000, (err) => {
  if (err) {
      throw Error(err);
  }
  console.log('Сервер Zoom запущен!');
});