import Category from "../models/Category.js";

export const createCategory = async (req, res) => {

    try {

            const { name, description } = req.body;

            if(!name || !description){
                return res.status(400).json({ message: "Name and description are required" });
            }

        
        const newCategory = await Category.create({ name, description });
        res.status(201).json(newCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to create category", error });
    }
};


export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if(!categories){
            return res.status(404).json({ message: "No categories found" });
        }
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to retrieve categories", error });
    }
};



export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "category deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to delete category", error });
    }
};


