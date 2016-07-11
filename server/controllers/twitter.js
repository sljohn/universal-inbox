'use strict';

const Twitter = require('twitter');

let client;

// Create block scope for local jshint rules allowing camelcase
{
  /* jshint camelcase: false */
  client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRENT,
    bearer_token: process.env.TWITTER_BEARER_TOKEN,
  });
}

function getTweets(username /*, sinceId */) {
  //prepend all usernames with %40, replacing the @ symbol if provided
  username = username.replace(/^(@|%40)?/, '%40');

  return new Promise(function (resolve, reject) {
    //const query = { q: username, since_id: sinceId };
    client.get('search/tweets', { q: username }, function (error, tweets) {
      if (error) {
        reject(error);
      }

      resolve(tweets);
    });
  });
}

module.exports.getTweets = getTweets;
