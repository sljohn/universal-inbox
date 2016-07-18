'use strict';

function MainController(TweetsFactory) {
  const vm = this;

  //<editor-fold desc="Get and display tweets">
  vm.tweets = [];

  TweetsFactory.getTweets().then((data) => {
    vm.tweets = data;
  });

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
