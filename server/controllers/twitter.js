const Twitter = require('Twitter');
const dotenv = require('dotenv');
const path = require('path');

dotenv.load({path: path.__dirname + '/../.env'});

console.log(process.env)
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRENT,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
});

function getTweets (username, since_id) {
  //prepend all usernames with %40, replacing the @ symbol if provided
  username = username.replace(/^(@|%40)?/, '%40');

  return new Promise(function (resolve, reject) {
    const query = {q: username, since_id: since_id}
    client.get('search/tweets', {q: username}, function(error, tweets, response) {
      if (error) {
        reject(error);
      };
    resolve(tweets);
    });
  });
};

module.exports.searchUser = searchUser;
