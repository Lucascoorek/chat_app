const express = require('express');
const router = express.Router();
const { addUser, getUser } = require('../utils/users');
const { generateMessage } = require('../utils/messages');
/* 
  io object is passed from server/index.js 
  const io = socketio(server); 
*/
module.exports = function(io) {
  /* establishes connect and emits message event to the client */
  io.on('connection', socket => {
    console.log('New Websocket connection');
    socket.on('addUser', ({ username, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, username, room });
      if (error) {
        return callback(error);
      }

      socket.join(user.room);
      socket.emit('message', generateMessage('Admin', 'Welcome'));
      socket.broadcast
        .to(user.room)
        .emit(
          'message',
          generateMessage('Admin', `${user.username} has joined!`)
        );
      // io.to(user.room).emit('usersData', {
      //   room: user.room,
      //   users: getUsersInRoom(user.room)
      // });
      socket.on('sendMessage', txt => {
        const user = getUser(socket.id);
        if (user) {
          io.to(user.room).emit('message', generateMessage(user.username, txt));
        }
      });

      callback(undefined, user);
    });
  });
  return router;
};
