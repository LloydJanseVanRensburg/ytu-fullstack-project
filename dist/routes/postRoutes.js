import express from 'express';
import { createPost, deletePostById, getAllPosts, getPostById, updatePostById, } from '../controllers/postControllers.js';
const router = express.Router();
router.route('/').get(getAllPosts).post(createPost);
router
    .route('/:id')
    .get(getPostById)
    .put(updatePostById)
    .delete(deletePostById);
export default router;
