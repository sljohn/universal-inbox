const express = require('express');
const postsController = require('../controllers/posts');

const postRoutes = express.Router();

postRoutes.get('/', postsController.getAllPosts);

module.exports = postRoutes;
