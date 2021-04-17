let fs = require('fs');
let PeerServer = require('peer').PeerServer;
let server = PeerServer({
    port: 9003,
    path: '/peerjs',
    ssl: {
        key: fs.readFileSync('./user.txt'),
        cert: fs.readFileSync('./server.txt'),
        ca: fs.readFileSync('./ca.txt'),
    }
});