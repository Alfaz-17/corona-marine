import express from 'express'
import { getMe, login, logout, signup } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router =express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/me",authMiddleware,getMe)
router.post("/logout",authMiddleware,logout)
export default router;







