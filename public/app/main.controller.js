'use strict';

function MainController(TweetsFactory) {
  const vm = this;

  vm.tweets = [];

  // Saving this method when getTweets is a real
  // promise.
  TweetsFactory.getTweets().then((data) => {
    vm.tweets = data;
  });


  //const tweets = TweetsFactory.getTweets();

  // vm.tweets = TweetsFactory.getTweets();

  /*tweets.forEach(function(tweet) {
    console.log('tweet.text: ', tweet.text);
    console.log('tweet.user.name: ', tweet.user.name);
    console.log('tweet.user.screen_name: @', tweet.user.screen_name);
    console.log('tweet.user.profile_image_url: ', tweet.user.profile_image_url);
    console.log('tweet.user.profile_image_url_https: ', tweet.user.profile_image_url_https);
    console.log('tweet.created_at: ', tweet.created_at);
    // console.log('tweet: ', tweet);
    // console.log('tweet: ', tweet);


  });*/

}

angular
  .module('universal-inbox.MainController', [])
  .controller('MainController', MainController);

MainController.$inject = ['TweetsFactory'];
