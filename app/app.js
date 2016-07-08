angular
  .module('Main', [])
  .controller('MainCtrl', function($scope){
    $scope.messTitle = "Message Title Here";
    $scope.messBody = "Message Body Here";
  })
  .factory('MainFactory', function(){

  });