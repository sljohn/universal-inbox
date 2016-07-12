'use strict';

function TweetsFactory($http, logger) {

  function getTweets() {
    return $http({
      method: 'GET',
      url: '/api/twitter'
    }).then(function successCallback(resp) {
      return resp.data;
    }, function errorCallback(resp) {
      logger.logError(resp);
    });
  }

  return {
    getTweets
  };
}

angular
  .module('universal-inbox.TweetsFactory', [])
  .factory('TweetsFactory', TweetsFactory);

  TweetsFactory.$inject = ['$http', 'logger'];
