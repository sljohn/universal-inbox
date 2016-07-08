const dummyTweets = require('../db/dummyTweets.json');

exports.getAllPosts = (req, res) => {
  res.send(dummyTweets);
};
