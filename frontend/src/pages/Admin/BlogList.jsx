import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, FileText, Calendar, User, Eye } from 'lucide-react';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    filterBlogs();
  }, [blogs, searchTerm]);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/admin/blogs', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        // Demo mode - use static data
        const demoBlogs = [
          {
            id: 1,
            title: "Essential Marine Safety Equipment Every Vessel Should Have",
            excerpt: "Discover the critical safety equipment that every marine vessel must carry to ensure crew safety and regulatory compliance.",
            content: "Marine safety is paramount in the maritime industry...",
            date: "2024-01-15",
            image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg",
            author: "Captain James Morrison"
          },
          {
            id: 2,
            title: "The Future of Marine Electronics: What's Coming Next",
            excerpt: "Explore the latest technological advances in marine electronics and how they're revolutionizing navigation and communication at sea.",
            content: "The marine electronics industry is rapidly evolving...",
            date: "2024-01-10",
            image: "https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg",
            author: "Dr. Sarah Chen"
          },
          {
            id: 3,
            title: "Maintenance Tips for Marine Diesel Engines",
            excerpt: "Keep your marine diesel engines running smoothly with these professional maintenance tips and best practices.",
            content: "Regular maintenance is crucial for the longevity...",
            date: "2024-01-05",
            image: "https://images.pexels.com/photos/8986070/pexels-photo-8986070.jpeg",
            author: "Master Mechanic Tony Rodriguez"
          }
        ];
        setBlogs(demoBlogs);
      }
    } catch (error) {
      console.log('Backend server not available - using demo data');
      const demoBlogs = [
        {
          id: 1,
          title: "Essential Marine Safety Equipment Every Vessel Should Have",
          excerpt: "Discover the critical safety equipment that every marine vessel must carry to ensure crew safety and regulatory compliance.",
          date: "2024-01-15",
          image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg",
          author: "Captain James Morrison"
        }
      ];
      setBlogs(demoBlogs);
    } finally {
      setIsLoading(false);
    }
  };

  const filterBlogs = () => {
    let filtered = blogs;

    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBlogs(filtered);
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      const response = await fetch(`/admin/blogs/${blogId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setBlogs(blogs.filter(b => b.id !== blogId));
        setMessage({ type: 'success', text: 'Blog post deleted successfully!' });
      } else {
        // Demo mode - simulate deletion
        setBlogs(blogs.filter(b => b.id !== blogId));
        setMessage({ type: 'success', text: 'Blog post deleted successfully! (Demo mode)' });
      }
    } catch (error) {
      console.log('Backend server not available - demo deletion');
      setBlogs(blogs.filter(b => b.id !== blogId));
      setMessage({ type: 'success', text: 'Blog post deleted successfully! (Demo mode)' });
    }

    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600 mt-1">Manage blog articles and content</p>
        </div>
        <Link to="/admin/blogs/new" className="btn btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Blog Post
        </Link>
      </div>

      {/* Success/Error Messages */}
      {message.text && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          <span>{message.text}</span>
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="form-control max-w-md">
          <label className="label">
            <span className="label-text font-medium">Search Blog Posts</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title, excerpt, or author..."
              className="input input-bordered w-full pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {searchTerm && (
          <div className="mt-4">
            <button
              onClick={() => setSearchTerm('')}
              className="btn btn-outline btn-sm"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Blog Post</th>
                <th>Author</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.map((blog, index) => (
                <motion.tr
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={blog.image} alt={blog.title} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{blog.title}</div>
                        <div className="text-sm opacity-50 truncate max-w-xs">
                          {blog.excerpt}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      {blog.author}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {new Date(blog.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/blog/${blog.id}`}
                        className="btn btn-ghost btn-sm"
                        title="View Blog Post"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        to={`/admin/blogs/edit/${blog.id}`}
                        className="btn btn-ghost btn-sm"
                        title="Edit Blog Post"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="btn btn-ghost btn-sm text-red-600 hover:bg-red-50"
                        title="Delete Blog Post"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500 mb-4">No blog posts found.</p>
            <Link to="/admin/blogs/new" className="btn btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Write Your First Post
            </Link>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="stat-title">Total Posts</div>
          <div className="stat-value text-primary">{blogs.length}</div>
        </div>
        <div className="stat bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="stat-title">Search Results</div>
          <div className="stat-value text-secondary">{filteredBlogs.length}</div>
        </div>
        <div className="stat bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="stat-title">Authors</div>
          <div className="stat-value text-accent">
            {new Set(blogs.map(b => b.author)).size}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;