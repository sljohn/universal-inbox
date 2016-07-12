'use strict';

angular
  .module('universal-inbox.router', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('/', {
        url: '/',
        templateUrl: 'app/partials/feed.html',
        controller: 'MainController as vm',
      });
  });
