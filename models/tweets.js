const mongoose = require('mongoose');
const Mixed = mongoose.Schema.Types.Mixed;

const tweetSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  created_at: String,
  text: String,
  user: {
    handle: String,
    fullname: String,
  },
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
