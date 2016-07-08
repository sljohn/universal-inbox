'use strict'; //node requires this for the use of 'let'
const dummyTweets = require('../db/dummyTweets.json');
const twitter = require('./twitter.js');

const getTweets = function() {
  let tweets = [];
  twitter.getTweets('makersquare').then(function(res) { //TODO: don't hardcode username
    tweets = res;
  });
  return tweets;
}

exports.getAllPosts = (req, res) => {
  //res.send(dummyTweets);
  res.send(getTweets());
};

