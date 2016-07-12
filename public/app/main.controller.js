'use strict';

function MainController(TweetsFactory) {
  const vm = this;

  //<editor-fold desc="Get and display tweets">
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
  //</editor-fold>

  //<editor-fold desc="Filter by completed posts">
  vm.viewCompleted = false;

  vm.matchesCompletedFilter = function (post) {
    return post.completedByUser ? vm.viewCompleted : !vm.viewCompleted;
  };

  //vm.applyCompletedFilter = function (filterStr) {
  //
  //}
  //</editor-fold>
}

angular
  .module('universal-inbox.MainController', [])
  .controller('MainController', MainController);

MainController.$inject = ['TweetsFactory'];

