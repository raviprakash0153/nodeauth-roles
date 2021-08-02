const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  todo: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      title: {
        type: String,
        required: true,
      },
      todoDesc: {
        type: String,
        required: true,
      },
    },
  ],
});

const Profile = mongoose.model('profile', ProfileSchema);

module.exports = Profile;
