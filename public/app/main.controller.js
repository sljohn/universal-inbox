'use strict';

angular
  .module('universal-inbox.MainController', [])
  .controller('MainController', function () {

    const vm = this;

    vm.name = 'Jane';
    vm.username = 'janedone';
    vm.messageBody = 'Look what we have here!';
    vm.dateTime = new Date().toLocaleString();

  });
