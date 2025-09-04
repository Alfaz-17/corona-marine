import express from 'express'
import { createBrand, getAllBrands } from '../controllers/brandController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();


router.get("/",getAllBrands);
router.post("/",authMiddleware,createBrand);


export default router;