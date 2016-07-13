const expect = require('chai').expect;
const supertest = require('supertest');
const express = require('express');
const app = require('../server/server.js'); //this should be the config file, where app is initialized


describe('confirming that the server works properly', function(){

  it('should make requests to the server', function(done){
    supertest(app)
      .get('/')
      .expect(200, done);
  });
  it('should throw an error when a requested URL does not exist', function(done){
    supertest(app)
      .get('/foo/bar')
      .expect(404, done);
  });
});