'use strict';
/* jshint unused:false */

function MainController($window, TweetsFactory, GmailFactory, PostsFactory, linkify) {

  const vm = this;
  const gapi = $window.gapi;

  //<editor-fold desc="Get and display tweets">
  vm.tweets = [];

  TweetsFactory.getTweets().then((data) => {
    vm.tweets = data;
  });

  //</editor-fold>

  //<editor-fold desc="Filter posts by completed">
  vm.viewCompleted = false;

  vm.matchesCompletedFilter = function (post) {
    return post.completedByUser ? vm.viewCompleted : !vm.viewCompleted;
  };

  //</editor-fold>

  //<editor-fold desc="Mark post completed/uncompleted">
  vm.updateCompletedStatus = function (completedStatus, post) {
    // Version that works without connecting to the database:
    //post.completedByUser = (status === 'completed');

    {
      /* jshint camelcase: false */
      PostsFactory.updateCompletedStatus(completedStatus, post.id_str)
        .then(function () {
          post.completedByUser = (completedStatus === 'completed');
        })
        .catch(function (err) {
          console.error('Failed to update post status. Error:', err);

          // TODO: Some sort of error handling
        });
    }
  };

  //</editor-fold>

  //<editor-fold desc="Gmail authentication">
  vm.gmailLabels = [];
  vm.gmails = [];

  const gmailCreds = {
    nico: '394896127572-n8cak7pmi1vghqm1oj4933pd5tb53r4u.apps.googleusercontent.com',
    groupId: {
      clientId: '278099091068-4sasl3gdt6g3j9jut839hq5i98q2cuge.apps.googleusercontent.com',
      accessToken: 'ya29.CjAkA2yzJzNCWosAgosiYyCFhiKeTLa_OUtIovt4-R-AwHjFOpqB-ZVhemATVZg4wVs',
      clientSecret: '7H5yi-MztyI1yTQ0AHYIpu1H',
    },
  };
  const scopes = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.compose',
  ];

  /**
   * Print all Labels in the authorized user's inbox. If no labels
   * are found an appropriate message is printed.
   */
  function listEmails() {
    var request = gapi.client.gmail.users.messages.list({
      userId: 'me',
    });

    request.execute(function (resp) {
      console.log(resp);
      if (resp.messages && resp.messages.length) {
        vm.gmails.push(...resp.messages);
      }
    });
  }

  /**
   * Load Gmail API client library. List labels once client library
   * is loaded.
   */
  function loadGmailApi() {
    gapi.client.load('gmail', 'v1', listEmails);
  }

  /**
   * Handle response from authorization server.
   *
   * @param {Object} authResult Authorization result.
   */
  function handleAuthResult(authResult) {
    /* jshint camelcase: false */
    console.log('authResult: ', authResult);
    if (authResult && !authResult.error) {
      loadGmailApi();
    } else {
      //console.log('Authentication denied.');

      gapi.auth.authorize(
        {
          client_id: gmailCreds.groupId.clientId,
          scope: scopes,
          immediate: false,
        }, handleAuthResult);
    }
  }

  vm.checkAuth = function () {
    /* jshint camelcase: false */
    gapi.auth.authorize({
      client_id: gmailCreds.groupId.clientId,
      scope: scopes.join(' '),
      immediate: true,
    }, handleAuthResult);
  };

  //</editor-fold>

  vm.emails = [
    { id: '155ff0c28f523279',
      snippet: 'I ordered a box of peanut brittle five weeks ago. ' +
      'Where is it?!!?!1! ​Irate McIraterson',
      From: 'Nicholas Barry <niko.barry@gmail.com>',
      Date: 'Mon, 18 Jul 2016 10:26:34 -0700',
      Subject: 'Where\'s my order?!', },
    { id: '156007a054cd1e85',
      snippet: 'I\'m curious about MakerSquare. What does it take to become a student? Elyse',
      Date: 'Mon, 18 Jul 2016 03:24:15 -0700',
      Subject: 'How can I prepare to join MakerSquare?',
      From: 'Elyse Green <elgreen@ucdavis.edu>', },
    { id: '15600da6a5a356d1',
      snippet: 'On behalf of our company, RSquare, I demand that you stop violating our trademark' +
      ' with your "Make RSquare" website. If you don\'t, I\'ll have to serve you with a cease and' +
      ' desist letter. Alfred Pennyworth General Counsel RSquare, Inc.',
      Date: 'Sun, 17 Jul 2016 03:14:14 -0700',
      Subject: 'Stop violating our trademark',
      From: 'Alfred Pennyworth <counsel@RealMakeRSquare.com>', },
    { id: '15600ce057529519',
      snippet: 'Remember Sloth from The Goonies? https://www.youtube.com/watch?v=4Vv5CsP1pAg',
      Date: 'Sat, 16 Jul 2016 18:33:42 -0700',
      Subject: 'Hey You Guys!',
      From: 'SiLLyJustin <sillyjustin@gmail.com>', },
    { id: '15600cef9e3300c8',
      snippet: 'This message is intended to be private and had better not be up on ' +
      'some projector somewhere...or I\'ll sue!!!',
      Date: 'Sat, 16 Jul 2016 02:37:47 -0700',
      Subject: 'Customer complaint',
      From: 'Bonnie Torre <torre.bonnie@gmail.com>', },
    { id: '15600cf8f641ed01',
      snippet: 'I know a lot of Pokemon tricks...',
      Date: 'Fri, 15 Jul 2016 18:55:11 -0700',
      Subject: 'FB: Hey can you be my friend?',
      From: 'Justin M Lien <lien.justin.m@gmail.com>', },
    { id: '15600d20e83e7fa1',
      snippet: 'Gabriel Tramullas is the best! https://www.youtube.com/watch?v=XVPNUIJjG5E',
      Date: 'Fri, 15 Jul 2016 02:44:04 -0700',
      Subject: 'Watch this aerial rope act!!!',
      From: 'John Slape <slape.john@gmail.com>', },
    { id: '15600d2b0de3d49b',
      snippet: 'My favorite Epic Rap Battle! You have to watch this: ' +
      'https://www.youtube.com/watch?v=KfkR5o_bcSg',
      Date: 'Thu, 14 Jul 2016 17:53:43 -0700',
      Subject: 'Hannibal vs Jack the Ripper',
      From: 'John Slape <slape.john@gmail.com>', },
  ];
}

angular
  .module('universal-inbox.MainController', [])
  .controller('MainController', MainController);

MainController.$inject = ['$window', 'TweetsFactory', 'GmailFactory', 'PostsFactory', 'linkify'];

