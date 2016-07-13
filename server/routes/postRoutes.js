const express = require('express');
const postsController = require('../controllers/posts');

const postRoutes = express.Router();

postRoutes.get('/', postsController.getAllPosts);

postRoutes.put('/:postId', postsController.updatePost);

module.exports = postRoutes;
