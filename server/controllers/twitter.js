'use strict';
const Twitter = require('twitter');
const path = require('path');
const dbTweet = require('../models/tweets.js');

let client;
{
  /*jshint camelcase:false*/
  client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRENT,
    bearer_token: process.env.TWITTER_BEARER_TOKEN,
  });
}

function cacheTweets(username, sinceId) {
  //prepend all usernames with %40, replacing the @ symbol if provided
  username = username.replace(/^(@|%40)?/, '%40');
  const query = { q: username, since_id: sinceId };
  
  client.get('search/tweets', query, function (error, tweets, response) {
    if (error) {
      console.log(error);
    } else {
      tweets = tweets.statuses;
      for (let t of tweets) {
        const tweet = new dbTweet({
                                    text: t.text, 
                                    created_at: t.created_at,
                                    user: {handle: t.user.screen_name, fullname:t.user.name}
                                  })
        tweet.save(function(err, tweet) {
          if (err) {
            console.log(err);
          }
        })
      }
    }
  });
};

function findDbTweets(queryObj) {
  return dbTweet.find(queryObj).exec()
}

module.exports.cacheTweets = cacheTweets;
module.exports.findDbTweets = findDbTweets;