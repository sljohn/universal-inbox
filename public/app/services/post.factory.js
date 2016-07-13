'use strict';

function PostsFactory($http) {
  function myFunc() {
    return $http({
      method: '',
      url: '',
      data: {},
    });
  }

  return { myFunc };
}

angular
  .module('universal-inbox.PostsFactory', [])
  .factory('PostsFactory', PostsFactory);

// A different method to add dependency injection.
PostsFactory.$inject = ['$http'];

