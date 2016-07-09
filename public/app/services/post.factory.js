angular
  .module('universal-inbox.PostsFactory', [])
  .factory('PostsFactory', function($http) {

    function myCoolFnc() {
      // function body
      // return $http
    }

    return {
      myCoolFnc: myCoolFnc
    };
  });
