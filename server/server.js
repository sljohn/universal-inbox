'use strict';

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const db = require('./db/db');

/*
** Load local enviroment variables from .env file where secrets and keys are configured.
*/
if (!process.env.SESSION_SECRET) { // If it's undefined, then we're running locally
  const dotenv = require('dotenv');
  dotenv.load({ path: '.env' });
}

/*``
** Route Controllers
*/
const homeController = require('./controllers/home');

/*
** Create Express server.
*/
const app = express();

/*
** Express configuration.
*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: false, // Do not initialize a session until a user is signed in.
  secret: process.env.SESSION_SECRET || dotenv.SESSION_SECRET,
}));
app.use(express.static(path.join(__dirname, '../public')));

/*
** App routes.
*/
app.get('/', homeController.index);

const postRoutes = require('./routes/postRoutes');
app.use('/api/posts', postRoutes);

module.exports = app;
