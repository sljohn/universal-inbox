'use strict';

angular
  .module('universal-inbox.router', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('/', {
        url: '/',
        templateUrl: 'app/partials/login.html',
        controller: 'AuthController as vm',
      })
      .state('feed', {
        url: '/feed',
        templateUrl: 'app/partials/feed.html',
        controller: 'MainController as vm',
      });

  });
