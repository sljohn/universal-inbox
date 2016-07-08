const mongoose = require('mongoose');
const Mixed = mongoose.Schema.Types.Mixed;

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  auth: {
    twitter: Mixed,
    gmail: Mixed,
    facebook: Mixed,
    linkedin: Mixed,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
