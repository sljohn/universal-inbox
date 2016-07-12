'use strict';

/**
 * @namespace Logger
 * @desc Application wide logger
 * @memberOf Factories
 */
function logger($log) {
  /**
   * @name logError
   * @desc Logs errors
   * @param {String} msg Message to log
   * @returns {String}
   * @memberOf Factories.Logger
   */
  function logError(msg) {
    var loggedMsg = 'Error: ' + msg;
    $log.error(loggedMsg);
    return loggedMsg;
  }

  var service = { logError };
  return service;
}

/**
 * Logger Factory
 * @namespace Factories
 */
angular
  .module('utility.logger', [])
  .factory('logger', logger);

logger.$inject = ['$log'];
