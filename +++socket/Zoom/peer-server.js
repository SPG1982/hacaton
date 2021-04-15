var fs = require('fs');
var PeerServer = require('peer').PeerServer;
var server = PeerServer({
port: 9003,
path: '/peerjs',
ssl: {
        key: fs.readFileSync('./user.txt'),
        cert: fs.readFileSync('./server.txt'),
        ca: fs.readFileSync('./ca.txt'),
}
});