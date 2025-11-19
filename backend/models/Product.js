import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  image: String,
  images:[{type:String}],
  featured: { type: Boolean, default: false }
}, { timestamps: true });


export default mongoose.model("Product", productSchema);
