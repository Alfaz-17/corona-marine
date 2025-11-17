import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getDashboardStats, getOneProduct, toggleFeaturedProduct } from '../controllers/productController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();


router.get("/",getAllProducts);
router.get("/:id",getOneProduct);
router.post("/",authMiddleware,createProduct);
router.delete("/:id",authMiddleware,deleteProduct);
router.post("/toggle/:id",authMiddleware,toggleFeaturedProduct);
router.get("/dashboard/stats",authMiddleware,getDashboardStats);
export default router;