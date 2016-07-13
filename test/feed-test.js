const should = require('chai').should;
const expect = require('chai').expect;
const supertest = require('supertest');
const express = require('express');
const app = require('../server/server.js');
const twitter = require('../server/controllers/twitter.js');


describe('get all posts', function(){
  it('should retrieve response from the Twitter server', function(done){
    const twitterClient = twitter.client;
    expect(200);
    twitterClient.get('search/tweets', {q: '%40makersquare'}, function(err, res) {
      expect(200);
      expect(res['statuses'][0]).to.have.property("created_at");
      expect(res['statuses'][0]["created_at"]).to.not.equal(null);
      expect(res['statuses'][0]).to.have.property("id");
      expect(res['statuses'][0]["id"]).to.not.equal(null);
      expect(res['statuses'][0]).to.have.property("text");
      expect(res['statuses'][0]["text"]).to.not.equal(null);
      expect(res['statuses'][0]["user"]).to.have.property("name");
      expect(res['statuses'][0]["user"]["name"]).to.not.equal(null);
      expect(res['statuses'][0]["user"]).to.have.property("screen_name");
      expect(res['statuses'][0]["user"]["screen_name"]).to.not.equal(null);
      done();
    });
  });
});