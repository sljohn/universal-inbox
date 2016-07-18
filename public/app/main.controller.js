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
    { id: '155fd88ea6fb6740',
      snippet: 'Here are the stories people are talking about Trending Now on Facebook' +
      ' Here are the stories people are talking about. Sonia Kruger TV Personality Calls for ' +
      'Muslim Immigration to End Because She Wants',
      Date: 'Mon, 18 Jul 2016 03:24:15 -0700',
      Subject: 'Sonia Kruger and Central Park are Trending on Facebook',
      From: 'Facebook <notification+zrdvf1pi6c61@facebookmail.com>', },
    { id: '155f85966547f95a',
      snippet: 'Here are the stories people are talking about Trending Now on Facebook Here are' +
      ' the stories people are talking about. Teen Wolf 1st Look of Actor Dylan O&#39;Brien on 6th' +
      ' Season of TV Series Released -',
      Date: 'Sun, 17 Jul 2016 03:14:14 -0700',
      Subject: 'Teen Wolf and Overwatch are Trending on Facebook',
      From: 'Facebook <notification+zrdvf1pi6c61@facebookmail.com>', },
    { id: '155f67cd010eee72',
      snippet: 'The fastest way to find all of your friends on Facebook is importing your email ' +
      'contacts. Once you&#39;ve imported your contacts you can view, manage or delete them at any ' +
      'time. Find more of your',
      Date: 'Sat, 16 Jul 2016 18:33:42 -0700',
      Subject: 'You have more friends on Facebook than you think',
      From: 'Facebook <notification+zrdvf1pi6c61@facebookmail.com>', },
    { id: '155f311a8d5aa417',
      snippet: 'Here are the stories people are talking about Trending Now on Facebook Here are ' +
      'the stories people are talking about. Wonder Woman Entertainment Weekly Debuts New Images' +
      ' of Actress Gal Gadot for',
      Date: 'Sat, 16 Jul 2016 02:37:47 -0700',
      Subject: 'Wonder Woman and California are Trending on Facebook',
      From: 'Facebook <notification+zrdvf1pi6c61@facebookmail.com>', },
    { id: '155f16a20238fa7a',
      snippet: 'The fastest way to find all of your friends on Facebook is importing your email ' +
      'contacts. Once you&#39;ve imported your contacts you can view, manage or delete them at any' +
      ' time. Find more of your',
      Date: 'Fri, 15 Jul 2016 18:55:11 -0700',
      Subject: 'You have more friends on Facebook than you think',
      From: 'Facebook <notification+zrdvf1pi6c61@facebookmail.com>', },
    { id: '155edf10a8cb487b',
      snippet: 'Here are the stories people are talking about Trending Now on Facebook Here are the' +
      ' stories people are talking about. Lea Michele Actress Honors Former Boyfriend, ' +
      '&#39;Glee&#39; Co-Star Cory Monteith,',
      Date: 'Fri, 15 Jul 2016 02:44:04 -0700',
      Subject: 'Lea Michele and Reynoldsburg, Ohio are Trending on Facebook',
      From: 'Facebook <notification+zrdvf1pi6c61@facebookmail.com>', },
    { id: '155ec0b7fac41561',
      snippet: 'Here are the stories people are talking about Trending Now on Facebook Here are' +
      ' the stories people are talking about. Mo&#39;Nique Comedian and Actress Discusses Her' +
      ' Open Marriage With Husband Sidney',
      Date: 'Thu, 14 Jul 2016 17:53:43 -0700',
      Subject: 'Mo\'Nique and Tituss Burgess are Trending on Facebook',
      From: 'Facebook <notification+zrdvf1pi6c61@facebookmail.com>', },
    { id: '155e8924eef7da53',
      snippet: 'The fastest way to find all of your friends on Facebook is importing your email' +
      ' contacts. Once you&#39;ve imported your contacts you can view, manage or delete them' +
      ' at any time. Find more of your',
      Date: 'Thu, 14 Jul 2016 01:42:28 -0700',
      Subject: 'You have more friends on Facebook than you think',
      From: 'Facebook <notification+zrdvf1pi6c61@facebookmail.com>', },
    { id: '155e6d37cbc9edc2',
      snippet: 'Here are the stories people are talking about Trending Now on Facebook Here ' +
      'are the stories people are talking about. Victoria Beckham Fashion Designer and Model Posts' +
      ' Picture of Herself Kissing Her',
      Date: 'Wed, 13 Jul 2016 17:34:25 -0700',
      Subject: 'Victoria Beckham and Teen Mom 2 are Trending on Facebook',
      From: 'Facebook <notification+zrdvf1pi6c61@facebookmail.com>', },
    { id: '155e37bf3cfd592c',
      snippet: 'The fastest way to find all of your friends on Facebook is importing your ' +
      'email contacts. Once you&#39;ve imported your contacts you can view, manage or ' +
      'delete them at any time. Find more of your',
      Date: 'Wed, 13 Jul 2016 01:59:57 -0700',
      Subject: 'You have more friends on Facebook than you think',
      From: 'Facebook <notification+zrdvf1pi6c61@facebookmail.com>', },
    { id: '155e1fc041219878',
      snippet: 'Here are the stories people are talking about Trending Now on Facebook ' +
      'Here are the stories people are talking about. The Flash The CW Reveals Costume ' +
      'Design for Kid Flash Character - Variety More',
      Date: 'Tue, 12 Jul 2016 19:00:36 -0700',
      Subject: 'The Flash and Minnesota Lynx are Trending on Facebook',
      From: 'Facebook <notification+zrdvf1pi6c61@facebookmail.com>', },
    { id: '155e02304ccf9c3b',
      snippet: 'Here are the stories people are talking about Trending Now on Facebook ' +
      'Here are the stories people are talking about. Google &#39;Pokémon GO&#39; Addre' +
      'sses Message That Says It Has &#39;Full Access',
      Date: 'Tue, 12 Jul 2016 10:23:58 -0700',
      Subject: 'Google and Saint Paul, Minnesota are Trending on Facebook',
      From: 'Facebook <notification+zrdvf1pi6c61@facebookmail.com>', },
    { id: '155dddfbb10e796d',
      snippet: 'The fastest way to find all of your friends on Facebook is importing yo' +
      'ur email contacts. Once you&#39;ve imported your contacts you can view, manage o' +
      'r delete them at any time. Find more of your',
      Date: 'Mon, 11 Jul 2016 23:51:14 -0700',
      Subject: 'You have more friends on Facebook than you think',
      From: 'Facebook <notification+zrdvf1pi6c61@facebookmail.com>', },
    { id: '155dc20e8924d4b7',
      snippet: 'The fastest way to find all of your friends on Facebook is importing y' +
      'our email contacts. Once you&#39;ve imported your contacts you can view, manage' +
      ' or delete them at any time. Find more of your',
      Date: 'Mon, 11 Jul 2016 15:43:11 -0700',
      Subject: 'You have more friends on Facebook than you think',
      From: 'Facebook <notification+zrdvf1pi6c61@facebookmail.com>', },
    { id: '155da4eac5a5653e',
      snippet: 'Add the people you know to see their photos and updates. Rachelle Cu M' +
      'eksavanh Add Friend Martin Leong Tennyson High Add Friend People You May Know A' +
      'dd the people you know to see their photos and',
      Date: 'Mon, 11 Jul 2016 07:13:56 -0700',
      Subject: 'Do you know Rachelle Cu Meksavanh and Martin Leong?',
      From: 'Facebook <notification+zrdvf1pi6c61@facebookmail.com>', },
    { id: '155d07f093a094c9',
      snippet: 'We&#39;re so glad you&#39;re on Facebook! Facebook is better with frie' +
      'nds, so start connecting with people you know. Chat with Friends and Family We ' +
      'want your experience on Facebook to be full of',
      Date: 'Sat, 9 Jul 2016 09:30:34 -0700',
      Subject: 'Welcome to Facebook: 3 ways to get started',
      From: 'Facebook <registration@facebookmail.com>', },
  ];
}

angular
  .module('universal-inbox.MainController', [])
  .controller('MainController', MainController);

MainController.$inject = ['$window', 'TweetsFactory', 'GmailFactory', 'PostsFactory', 'linkify'];

