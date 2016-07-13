'use strict';

function TweetsFactory($http, logger) {

  function getTweets() {
    return $http({
      method: 'GET',
      url: '/api/twitter',
    }).then(resp => resp.data, err => logger.logError(resp));
  }

  function updateCompletedStatus(completedStatus, postId) {
    return $http({
      method: 'PUT',
      url: '/api/posts/' + postId,
      data: {
        changeRequested: 'completedStatus',
        newValue:        completedStatus,
      },
    });
  }

  return { getTweets, updateCompletedStatus };
}

angular
  .module('universal-inbox.TweetsFactory', [])
  .factory('TweetsFactory', TweetsFactory);

TweetsFactory.$inject = ['$http', 'logger'];
