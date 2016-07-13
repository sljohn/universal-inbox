'use strict';

const twitter = require('./twitter.js');
const DbTweet = require('../models/tweets.js');

exports.getAllPosts = (req, res) => {
  twitter.cacheTweets('makersquare'); // TODO: don't hardcode username
  twitter.findTweets({}).then(function (tweets) {
    if (tweets.length) {
      res.json(tweets);
    }
  });
};

exports.updatePost = (req, res) => {
  const updateSwitch = {
    completedStatus: () => {
      /* jshint camelcase: false */
      DbTweet.findOneAndUpdate({ id_str: req.params.postId },
        { completedByUser: req.body.newValue === 'completed' })
        .exec(err => {
          if (err) {
            console.error(err);
            return res.status(500).send('An error occurred when trying to update the ' +
              'completedByUser status of the post.');
          }

          res.status(200).send();
        });
    },
  };

  const unauthorizedChange = () => res.status(403).send('That operation is not allowed.');

  (updateSwitch[req.body.changeRequested] || unauthorizedChange)();
};
