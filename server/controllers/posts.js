const dummyTweets = require('./dummyTweets.json');

exports.getAllPosts = (req, res) => {
  res.send(dummyTweets);
};
