import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// user can see the posts without logging in
router.get('/', getPosts);
// need to be logged in to create/update/delete/like a post
router.post('/', auth, createPost);
// updatePost and deletePost will be managed on the front end
router.patch('/:id', auth, updatePost);
router.delete('/:id', deletePost);
// user can only like once for a specific id
// likePost will be managed on the back end
router.patch('/:id/likePost', auth, likePost);

export default router;