const mongoose = require('mongoose');
const Mixed = mongoose.Schema.Types.Mixed;

const tweetSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  created_at: String,
  text: String,
  user: Mixed,
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = tweetSchema;
