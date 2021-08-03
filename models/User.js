const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'employee'],
    default: 'user',
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
