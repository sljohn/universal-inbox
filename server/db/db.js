const mongoose = require('mongoose');

const DB_ADDRESS = process.env.MONGODB_URI || 'mongodb://localhost';
mongoose.connect(DB_ADDRESS + '/universal-inbox');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('db connected');
});

module.exports = db;
