import express from 'express'
import { createBlogPost, getAllBlogPosts } from '../controllers/blogController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();


router.get("/",authMiddleware,getAllBlogPosts);
router.post("/",authMiddleware,createBlogPost);


export default router;