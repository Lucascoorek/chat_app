const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {
  addUser,
  getUser,
  getUsersInRoom,
  removeUser
} = require('../utils/users');
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
      // const { error, user } = addUser({ id: socket.id, username, room });
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
      User.findByIdAndDelete(user._id).then(user => {
        io.to(user.room).emit(
          'message',
          generateMessage('Admin', `${user.username} has left`)
        );
        User.find({ room: user.room }).then(data => {
          io.to(user.room).emit('usersData', {
            room: user.room,
            users: data
          });
        });
        socket.disconnect();
      });
    });
  });
  return router;
};
