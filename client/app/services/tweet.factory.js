angular
  .module('universal-inbox.TweetsFactory', [])
  .factory('TweetsFactory', TweetsFactory);

  TweetsFactory.$inject = ['$http', 'logger'];
  
  function TweetsFactory($http, logger) {

    function getTweets() {
      return $http({
        method: 'GET',
        url: 'api/tweets'
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