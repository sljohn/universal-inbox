'use strict';

function GmailFactory($http, logger) {
  function getEmails() {
    return $http({
      method: 'GET',
      url: '/api/gmail',
    }).then(resp => resp.data, err => logger.logError(err));
  }

  return { getEmails };
}

angular
  .module('universal-inbox.GmailFactory', [])
  .factory('GmailFactory', GmailFactory);

GmailFactory.$inject = ['$http', 'logger'];
