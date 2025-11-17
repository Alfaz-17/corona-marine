import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: String,
  content: String,
  date: Date,
  image: String,
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);
