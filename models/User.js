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

// User.getUserById = function (id, callback) {
//   User.findById(id, callback);
// };

// User.getUserByUsername = function (username, callback) {
//   const query = { username: username };
//   User.findById(query, callback);
// };

// salt is random key which is used and added with plain text paswword we provide to hash password

// User.addUser = function (newUser, callback) {
//   try {
//     bcrypt.hash(newUser.password, 10, (hash) => {
//       newUser.password = hash;
//       newUser.save(callback);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

//
// User.addUser = function (newUser, callback) {
//   bcrypt.hash(newUser.password, 10, (err, hash) => {
//     if (err) throw err;
//     newUser.password = hash;
//     newUser.save(callback);
//   });
// };
//

// User.comparePassword = function (password, hash, callback) {
//   bcrypt.compare(password, hash, (isMatch) => {
//     try {
//       callback(null, isMatch);
//     } catch (err) {
//       console.log(err);
//     }
//   });
// };

///
// User.comparePassword = function (password, hash, callback) {
//   bcrypt.compare(password, hash, (err, isMatch) => {
//     if (err) throw err;
//     callback(null, isMatch);
//   });
// };
//
