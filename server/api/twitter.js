var Twitter = require('Twitter');

var client = new Twitter({
  consumer_key: 'MSzCH9H5I97C7UjpTENbzVvFN',
  consumer_secret: '1KLNCBVmOhVtd1hakouhP5SKrNmXSlKFEO1C349bIPqo88Vdq6',
  bearer_token: 'AAAAAAAAAAAAAAAAAAAAADbzvwAAAAAAP040xC5nE0ZV7tIX3YtfS8kfLy4%3DWwBRk6JQS0xQ4HBLVBJlZxDkpdLqq3larmBtOP58cZNJ6YHPQT'
});

client.get('search/tweets', {q: '%40twitterapi'}, function(error, tweets, response) {
	if (error) {console.log(error)};
  console.log(JSON.stringify(tweets.statuses[0]));
});
