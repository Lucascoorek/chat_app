const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  room: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  }
});
module.exports = mongoose.model('user', UserSchema);
