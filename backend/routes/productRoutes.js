import express from 'express'
import { createProduct, getAllProducts, getOneProduct } from '../controllers/productController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();


router.get("/",authMiddleware,getAllProducts);
router.get("/:id",authMiddleware,getOneProduct);
router.post("/",authMiddleware,createProduct);


export default router;