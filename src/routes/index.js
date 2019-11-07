const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateMessage } = require('../utils/messages');
/* 
  io object is passed from root/index.js 
  const io = socketio(server); 
*/
module.exports = function(io) {
  /* establishes connect and emits message event to the client */
  io.on('connection', socket => {
    console.log('New Websocket connection');
    socket.on('addUser', ({ username, room }, callback) => {
      const user = new User({ username, room });
      user
        .save()
        .then(user => {
          socket.join(user.room);
          socket.emit('message', generateMessage('Admin', 'Welcome'));
          socket.broadcast
            .to(user.room)
            .emit(
              'message',
              generateMessage('Admin', `${user.username} has joined!`)
            );
          callback(undefined, user);
          User.find({ room: user.room }).then(data => {
            io.to(user.room).emit('usersData', {
              room: user.room,
              users: data
            });
          });
        })
        .catch(error => callback(error));
    });

    socket.on('sendMessage', (txt, user) => {
      User.findById(user._id)
        .then(user => {
          io.to(user.room).emit('message', generateMessage(user.username, txt));
        })
        .catch(err => console.log(err));
    });
    socket.on('removeUser', user => {
      const { username, room } = user;

      User.deleteOne({ username, room })
        .then(user => {
          socket.broadcast
            .to(room)
            .emit('message', generateMessage('Admin', `${username} has left`));
          User.find({ room }).then(data => {
            socket.broadcast.to(room).emit('usersData', {
              room,
              users: data
            });
          });
        })
        .catch(err => console.log(err));
      socket.disconnect();
    });
    socket.on('disconnect', () => console.log('disconnect'));
  });
  return router;
};
