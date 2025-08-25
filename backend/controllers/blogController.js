import Blog from "../models/Blog.js";


export const createBlogPost = async (req, res) => {
    try {
        const newPost = new Blog(req.body);
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to create blog post", error });
    }
};



export const getAllBlogPosts = async (req, res) => {
    try {
        const posts = await Blog.find();
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to retrieve blog posts", error });
    }
}

export const getOneBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Blog.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to retrieve blog post", error });
    }
};
