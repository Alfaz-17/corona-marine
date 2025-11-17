import express from 'express'
import { createBlogPost, deleteBlog, getAllBlogPosts, getOneBlogPost } from '../controllers/blogController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();


router.get("/",getAllBlogPosts);
router.post("/",authMiddleware,createBlogPost);
router.get("/:id",getOneBlogPost);
router.delete("/:id",authMiddleware,deleteBlog);

export default router;