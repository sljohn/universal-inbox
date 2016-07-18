angular
  .module('universal-inbox', [
    'angularMoment',
    'utility.logger',
    'directive.setHeight',
    'ui.router',
    'ui.bootstrap',
    'universal-inbox.router',
    'universal-inbox.AuthController',
    'universal-inbox.PostsFactory',
    'universal-inbox.MainController',
    'universal-inbox.TweetsFactory'
  ]);