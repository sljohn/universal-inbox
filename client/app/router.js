angular
  .module('universal-inbox.router', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('/', {
        url: '/',
        templateUrl: 'app/partials/feed.html',
        controller: 'MainController as vm'
      });

  });
