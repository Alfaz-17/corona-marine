import express from 'express'
import { createBlogPost, getAllBlogPosts, getOneBlogPost } from '../controllers/blogController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();


router.get("/",getAllBlogPosts);
router.post("/",authMiddleware,createBlogPost);
router.get("/:id",getOneBlogPost);

export default router;