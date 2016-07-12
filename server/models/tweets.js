'use strict';

const mongoose = require('mongoose');

//const Mixed = mongoose.Schema.Types.Mixed;

let tweetSchema;
{
  /* jshint camelcase: false */
  tweetSchema = mongoose.Schema({
    mongo_id: mongoose.Schema.Types.ObjectId,
    id_str: {type: String, unique: true},
    created_at: String,
    text: String,
    user: {
      name: String,
      screen_name: String,
      profile_image_url_https: String,
      url: String,
      description: String,
      id_str: String,
    },
    completed: {type: Boolean, default: false}
  });
}

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
