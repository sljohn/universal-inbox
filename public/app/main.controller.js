'use strict';

angular
  .module('universal-inbox.MainController', [])
  .controller('MainController', MainController);

MainController.$inject = ['TweetsFactory'];

function MainController(TweetsFactory) {
  const vm = this;

  vm.name = 'Jane';
  vm.username = 'janedone';
  vm.messageBody = 'Look what we have here!';
  vm.dateTime = new Date().toLocaleString();
}