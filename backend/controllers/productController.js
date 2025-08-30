import Product from "../models/Product.js";

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

    let query = {};
    if (category) {
      query.category = category; // filter by category if passed
    }

        const products = await Product.find().populate("category","name description");
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

