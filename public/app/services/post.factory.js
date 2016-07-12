'use strict';

function PostsFactory($http) {
  function updateCompletedStatus(status, postId) {
    return $http({
      method: 'PUT',
      url: '/api/posts/' + postId,
      data: { status },
    });
  }

  return { updateCompletedStatus };
}

angular
  .module('universal-inbox.PostsFactory', [])
  .factory('PostsFactory', PostsFactory);

// A different method to add dependency injection.
PostsFactory.$inject = ['$http'];

