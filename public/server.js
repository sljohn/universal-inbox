/*
** This server is for FRONT-END developement only
** Run node (or nodemon) server.js in terminal or console
** This server will server the index.html file and load
** partials views correctly.
** 
** If you run into a CORS issue, run this server and open
** http://localhost:8080 in your browser.
*/
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dev.index.html')));

const port = process.env.PORT || 8080;

app.listen(port);
console.log('Dev Server now listening on port ' + port);
