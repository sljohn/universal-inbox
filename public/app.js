angular
  .module('universal-inbox', [
    'angularMoment',
    'utility.logger',
    'directive.setHeight',
    'ui.router',
    'universal-inbox.router',
    'universal-inbox.AuthController',
    'universal-inbox.PostsFactory',
    'universal-inbox.MainController',
    'universal-inbox.TweetsFactory'
  ]);