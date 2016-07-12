angular
  .module('universal-inbox', [
    'universal-inbox.router',
    'utility.logger',
    'universal-inbox.PostsFactory',
    'universal-inbox.MainController',
    'universal-inbox.TweetsFactory',
    'ui.router'
  ]);