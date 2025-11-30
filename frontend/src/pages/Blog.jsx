import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import api from '../utils/api'; // ✅ your axios instance

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await api.get('/blogs');
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Search filter
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, blogs]);

  if (loading) return <p className="text-center py-10">Loading blogs...</p>;

  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero min-h-96 relative"
        style={{
          backgroundImage: "url('/assets/blogs.png')",
        }}
      >
        <div className="hero-overlay bg-marine-navy/90 mix-blend-multiply"></div>
        <div className="hero-content text-center text-white">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
      <h1 className="font-heading mb-5 text-5xl font-bold  drop-shadow-lg">
              Marine Industry Blog
            </h1>
            <p className="mb-5 text-xl text-marine-aqua">
              Latest news, insights, and tips from the maritime world
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          {/* Search */}
          <motion.div
            className="max-w-md mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="input input-bordered w-full pr-10 focus:border-cyan-500 focus:ring-cyan-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-500" />
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-lg text-cyan-700">
              Showing {filteredBlogs.length} article
              {filteredBlogs.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Featured Blog */}
      {filteredBlogs.length > 0 && ( 
  <motion.div
    className="mb-16 rounded-2xl overflow-hidden shadow-lg"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <img
      src={filteredBlogs[0].image}
      alt={filteredBlogs[0].title}
      className="w-full h-96 object-cover"
    />
    <div className="p-6 bg-white">
      <h2 className="font-heading text-3xl font-bold text-navy-800 mb-3">
        <Link to={`/blog/${filteredBlogs[0]._id}`} className="hover:text-cyan-600">
          {filteredBlogs[0].title}
        </Link>
      </h2>
      <p className="text-cyan-700 mb-4">{filteredBlogs[0].excerpt}</p>
      <Link
        to={`/blog/${filteredBlogs[0]._id}`}
        className="inline-block text-cyan-600 font-semibold hover:underline"
      >
        Read More →
      </Link>
    </div>
  </motion.div>
)}

{/* Blog Grid */}
<div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
  {filteredBlogs.slice(1).map((blog, index) => (   // 👈 Skip first blog
    <motion.article
      key={blog._id}
      className="break-inside-avoid rounded-xl overflow-hidden shadow-md hover:shadow-xl bg-white border border-cyan-100 transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <img src={blog.image} alt={blog.title} className="w-full object-cover" />
      <div className="p-4">
        <h2 classname="font-headingtext-xl font-semibold text-navy-800 hover:text-cyan-600">
          <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
        </h2>
        <p className="text-cyan-700 text-sm mt-2">{blog.excerpt}</p>
        <p className="text-xs text-cyan-500 mt-3">
          {new Date(blog.date).toLocaleDateString()}
        </p>
      </div>
    </motion.article>
  ))}
</div>

        </div>
      </section>
    </div>
  );
};

export default Blog;
