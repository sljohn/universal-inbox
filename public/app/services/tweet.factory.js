'use strict';

function TweetsFactory($http, logger) {

  function getTweets() {
    return $http({
      method: 'GET',
      url: '/api/twitter',
    }).then(resp => resp.data, err => logger.logError(err));
  }

  return { getTweets };
}

angular
  .module('universal-inbox.TweetsFactory', [])
  .factory('TweetsFactory', TweetsFactory);

TweetsFactory.$inject = ['$http', 'logger'];
