import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, User } from 'lucide-react';
import blogsData from '../data/blogs.json';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlogs = useMemo(() => {
    return blogsData.filter(blog =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero min-h-96 relative" style={{
        backgroundImage: 'url(https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg)',
      }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-white">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="mb-5 text-5xl font-bold">Marine Industry Blog</h1>
            <p className="mb-5 text-xl">
              Latest news, insights, and tips from the maritime world
            </p>
          </motion.div>
        </div>
      </section>

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
                className="input input-bordered w-full pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600">
              Showing {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <figure>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-slate-800 hover:text-blue-600 transition-colors">
                    <Link to={`/blog/${blog.id}`}>
                      {blog.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(blog.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {blog.author}
                    </div>
                  </div>
                  
                  <div className="card-actions justify-end">
                    <Link to={`/blog/${blog.id}`} className="btn btn-primary btn-sm">
                      Read More
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No articles found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;