import express from 'express'

const app = express();
import "dotenv/config";
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import brandRoutes from './routes/brandRoutes.js'
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import contactRoutes from './routes/contactRoutes.js'
connectDB();


app.use(
  cors({
    origin: process.env.CLIENT_URL, // your frontend URL
    credentials: true, // 🔑 allow cookies
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/contact",contactRoutes);

const PORT = process.env.PORT || 5000;







app.listen(PORT,()=>{
    console.log(`connect Port: ${PORT}`);
})