'use strict'; //node requires this for the use of 'let'
const twitter = require('./twitter.js');


exports.getAllPosts = (req, res) => {
   twitter.cacheTweets('makersquare'); //TODO: don't hardcode username
   twitter.findTweets({}).then(function(tweets) {
    if (tweets.length) {
      res.json(tweets);
    }
   })
};

