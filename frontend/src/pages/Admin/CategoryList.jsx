import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, Grid3X3 } from 'lucide-react';
import api from '../../utils/api';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    filterCategories();
  }, [categories, searchTerm]);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      console.log(res.data);
      setCategories(res.data);
    } catch (error) {
      console.log("Error in fetch categories", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterCategories = () => {
    let filtered = categories;

    if (searchTerm) {
      filtered = filtered.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCategories(filtered);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      const response = await api.delete(`/categories/${id}`);
      if (response.status === 200) {
        setCategories(categories.filter(c => c.id !== id));
        setMessage({ type: 'success', text: 'Category deleted successfully!' });
        fetchCategories();
      } else {
        setMessage({ type: 'error', text: 'Failed to delete category.' });
      }
    } catch (error) {
      console.log('Error deleting category:', error);
      setMessage({ type: 'error', text: 'Failed to delete category.' });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="loading loading-spinner loading-lg text-marine-aqua"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-marine-navy uppercase tracking-wide">Categories</h1>
          <p className="font-sans text-marine-blue mt-1">Manage product categories</p>
        </div>
        <Link 
          to="/admin/categories/new" 
          className="flex items-center gap-2 px-6 py-3 bg-marine-aqua text-marine-navy font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-marine-navy hover:text-white transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </Link>
      </div>

      {/* Success/Error Messages */}
      {message.text && (
        <div className={`alert ${message.type === 'success' ? 'alert-success bg-green-100 text-green-800 border-green-200' : 'alert-error bg-red-100 text-red-800 border-red-200'}`}>
          <span>{message.text}</span>
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-lg shadow-md border border-marine-aqua/10 p-6">
        <div className="form-control max-w-md">
          <label className="label">
            <span className="label-text font-bold text-marine-navy uppercase tracking-wide text-xs">Search Categories</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or description..."
              className="input input-bordered w-full pr-10 border-marine-blue/20 focus:border-marine-aqua focus:ring-1 focus:ring-marine-aqua bg-neutral-graylight/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-marine-blue/50" />
          </div>
        </div>

        {searchTerm && (
          <div className="mt-4">
            <button
              onClick={() => setSearchTerm('')}
              className="btn btn-outline btn-sm border-marine-blue/30 text-marine-blue hover:bg-marine-blue hover:text-white hover:border-marine-blue"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.id}
            className="card bg-white shadow-md border border-marine-aqua/10 hover:shadow-xl transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{category.icon || <Grid3X3 className="w-10 h-10 text-marine-aqua" />}</div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <h3 className="card-title text-marine-navy font-heading uppercase tracking-wide mb-2">{category.name}</h3>
              <p className="text-marine-blue/70 text-sm font-sans">{category.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <Grid3X3 className="w-16 h-16 text-marine-blue/20 mx-auto mb-4" />
          <p className="text-xl text-marine-blue/60 font-sans mb-4">No categories found.</p>
          <Link to="/admin/categories/new" className="btn btn-primary bg-marine-aqua text-marine-navy border-none hover:bg-marine-navy hover:text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Category
          </Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="stat bg-white rounded-lg shadow-md border border-marine-aqua/10">
          <div className="stat-title text-marine-blue font-bold uppercase tracking-wide text-xs">Total Categories</div>
          <div className="stat-value text-marine-navy">{categories.length}</div>
        </div>
        <div className="stat bg-white rounded-lg shadow-md border border-marine-aqua/10">
          <div className="stat-title text-marine-blue font-bold uppercase tracking-wide text-xs">Search Results</div>
          <div className="stat-value text-marine-aqua">{filteredCategories.length}</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;