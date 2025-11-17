import Brand from "../models/Brand.js";

export const createBrand = async (req, res) => {
    try {
        const newBrand = new Brand(req.body);
        await newBrand.save();
        res.status(201).json(newBrand);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to create brand", error });
    }
};

export const getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(200).json(brands);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to retrieve brands", error });
    }
};


export const getOneBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const brand = await Brand.findById(id);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        res.status(200).json(brand);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to retrieve Brand", error });
    }
};


export const deleteBrand = async (req, res) => {
  try {

    const { id } = req.params;

    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ message: "Brand is not founded" });
    }

    res.status(200).json({ message: "Brand is successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category", error });
  }
};
