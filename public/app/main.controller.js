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

  //<editor-fold desc="Filter posts by completed">
  vm.viewCompleted = false;

  vm.matchesCompletedFilter = function (post) {
    return post.completedByUser ? vm.viewCompleted : !vm.viewCompleted;
  };

  //</editor-fold>

  //<editor-fold desc="Mark post completed/uncompleted">
  vm.updateCompletedStatus = function (completedStatus, post) {
    // Version that works without connecting to the database:
    //post.completedByUser = (status === 'completed');

    {
      /* jshint camelcase: false */
      TweetsFactory.updateCompletedStatus(completedStatus, post.id_str)
        .then(function () {
          post.completedByUser = (completedStatus === 'completed');
        })
        .catch(function (err) {
          console.error('Failed to update post status. Error:', err);

          // TODO: Some sort of error handling
        });
    }
  };

  //</editor-fold>
}

angular
  .module('universal-inbox.MainController', [])
  .controller('MainController', MainController);

MainController.$inject = ['TweetsFactory'];
