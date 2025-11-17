import Brand from "../models/Brand.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import Blog from "../models/Blog.js";

export const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to create product", error });
    }
}


export const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let products;

    if (category) {
      // find category by name first
      const categoryDoc = await Category.findOne({ name: category });
      if (!categoryDoc) {
        return res.status(404).json({ message: "Category not found" });
      }

      // then filter products by category._id
      products = await Product.find({ category: categoryDoc._id })
        .populate("category", "name description");
    } else {
      // no filter → return all
      products = await Product.find()
        .populate("category", "name description");
    }

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to retrieve products", error });
  }
};


export const getOneProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        await product.populate("category", "name description");
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to retrieve product", error });
    }
};


export const toggleFeaturedProduct = async (req,res) =>{
  try {
    const {id}=req.params;

    const product =await Product.findById(id);

    if(!product){
      return res.status(400).json({message:"Product Not Founded"});
    }


product.featured = !product.featured;
await product.save();


 res.status(200).json({
      message: "Featured status toggled successfully",
      product
    });

  } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to delete product", error });
    }
};

//make api for total product total categories and total feturedproduct total brands and total blogpost

export const getDashboardStats = async (req, res) => {
  try {
    let totalProducts, totalCategories, totalFeaturedProducts, totalBrands, totalBlogPosts;

    try {
      totalProducts = await Product.countDocuments();
    } catch (e) {
      console.error("Error in Product.countDocuments:", e);
    }

    try {
      totalCategories = await Category.countDocuments();
    } catch (e) {
      console.error("Error in Category.countDocuments:", e);
    }

    try {
      totalFeaturedProducts = await Product.countDocuments({ featured: true });
    } catch (e) {
      console.error("Error in Product.countDocuments({ featured: true }):", e);
    }

    try {
      totalBrands = await Brand.countDocuments();
    } catch (e) {
      console.error("Error in Brand.countDocuments:", e);
    }

    try {
      totalBlogPosts = await Blog.countDocuments();
    } catch (e) {
      console.error("Error in Blog.countDocuments:", e);
    }

    res.status(200).json({
      totalProducts,
      totalCategories,
      totalFeaturedProducts,
      totalBrands,
      totalBlogPosts
    });
  } catch (error) {
    console.error("General error in getDashboardStats:", error);
    res.status(500).json({ message: "Failed to retrieve dashboard stats", error });
  }
};


