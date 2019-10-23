const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { generateMessage, generateLocation } = require('./utils/messages');
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

/* Passing io object to routes */
const routes = require('./routes/index')(io);
app.use('/', routes);

const port = process.env.PORT || 5000;
// const publicDirectoryPath = path.join(__dirname, '../client/public');

// app.use(express.static(publicDirectoryPath));

// io.on('connection', socket => {
//   console.log('New Websocket connection');

//   socket.on('join', ({ username, room }, callback) => {
//     const { error, user } = addUser({ id: socket.id, username, room });

//     if (error) {
//       return callback(error);
//     }

//     socket.join(user.room);
//     socket.emit('message', generateMessage('Admin', 'Welcome'));
//     socket.broadcast
//       .to(user.room)
//       .emit(
//         'message',
//         generateMessage('Admin', `${user.username} has joined!`)
//       );
//     io.to(user.room).emit('usersData', {
//       room: user.room,
//       users: getUsersInRoom(user.room)
//     });

//     callback();
//   });

//   socket.on('sendMessage', (txt, callback) => {
//     const user = getUser(socket.id);
//     if (txt === '') {
//       return callback('No text provided');
//     }
//     if (user) {
//       io.to(user.room).emit('message', generateMessage(user.username, txt));
//       callback();
//     }
//   });

//   socket.on('sendLocation', (coords, callback) => {
//     const user = getUser(socket.id);
//     if (user) {
//       io.to(user.room).emit(
//         'locationMessage',
//         generateLocation(user.username, coords)
//       );
//       callback();
//     }
//   });

//   socket.on('disconnect', () => {
//     const user = removeUser(socket.id);
//     if (user) {
//       io.to(user.room).emit(
//         'message',
//         generateMessage('Admin', `${user.username} has left`)
//       );
//       io.to(user.room).emit('usersData', {
//         room: user.room,
//         users: getUsersInRoom(user.room)
//       });
//     }
//   });
// });

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
