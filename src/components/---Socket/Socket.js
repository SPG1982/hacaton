import io from "socket.io-client";

//const socket = io.connect('https://109.106.138.108:8889', {rejectUnauthorized: false});

const socket = io.connect('https://server-hacaton.qpuzzle.ru:8887', {rejectUnauthorized: false});
// const socket = io.connect('https://video.qpuzzle.ru:9000', {rejectUnauthorized: false});


// console.log('111111111111')
// export const socket2 = io();
// export const socket = io();
// export default socket;

// export const ConnectSocket = () => {
//     const socket = io('109.106.138.108:8889');
//     socket.on('connect', (socket) => {
//         console.log('a user connected');
//     });
//
//     // socket.emit('USER', {'user': 111})
//     // socket.on('BROADCAST:USER', (data) => {console.log(data)})
//
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// }
export default socket