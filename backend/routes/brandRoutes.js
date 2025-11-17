import express from 'express'
import { createBrand, deleteBrand, getAllBrands } from '../controllers/brandController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();


router.get("/",getAllBrands);
router.post("/",authMiddleware,createBrand);
router.delete("/:id",authMiddleware,deleteBrand)

export default router;