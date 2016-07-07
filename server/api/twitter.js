const Twitter = require('Twitter');
const env = require('node-env-file');

env(__dirname + '/.env');

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRENT,
  bearer_token: process.env.BEARER_TOKEN
});

module.exports = {};
module.exports.searchUser = function(username) {
  //prepend all usernames with %40, replacing the @ symbol if provided
  username = username.replace(/^(@|%40)?/, '%40');

  return client.get('search/tweets', {q: username}, function(error, tweets, response) {
    if (error) {
      console.log(error)
    };
    return tweets;
  });
};
