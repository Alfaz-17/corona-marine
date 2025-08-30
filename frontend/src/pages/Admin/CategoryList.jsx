import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, Grid3X3 } from 'lucide-react';

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
      setIsLoading(true);
      const response = await fetch('/admin/categories', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        // Demo mode - use static data
        const demoCategories = [
          { id: 1, name: "Engines", description: "Marine diesel engines and power systems", icon: "⚙️" },
          { id: 2, name: "Electronics", description: "Navigation, communication and electronic systems", icon: "📡" },
          { id: 3, name: "Safety Equipment", description: "Marine safety and emergency equipment", icon: "🦺" },
          { id: 4, name: "Propulsion", description: "Propellers, shafts and propulsion systems", icon: "🚁" },
          { id: 5, name: "Anchoring", description: "Anchors, chains and mooring equipment", icon: "⚓" },
          { id: 6, name: "Deck Equipment", description: "Deck hardware and marine accessories", icon: "🔧" }
        ];
        setCategories(demoCategories);
      }
    } catch (error) {
      console.log('Backend server not available - using demo data');
      const demoCategories = [
        { id: 1, name: "Engines", description: "Marine diesel engines and power systems", icon: "⚙️" },
        { id: 2, name: "Electronics", description: "Navigation, communication and electronic systems", icon: "📡" },
        { id: 3, name: "Safety Equipment", description: "Marine safety and emergency equipment", icon: "🦺" }
      ];
      setCategories(demoCategories);
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

  const handleDelete = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      const response = await fetch(`/admin/categories/${categoryId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setCategories(categories.filter(c => c.id !== categoryId));
        setMessage({ type: 'success', text: 'Category deleted successfully!' });
      } else {
        // Demo mode - simulate deletion
        setCategories(categories.filter(c => c.id !== categoryId));
        setMessage({ type: 'success', text: 'Category deleted successfully! (Demo mode)' });
      }
    } catch (error) {
      console.log('Backend server not available - demo deletion');
      setCategories(categories.filter(c => c.id !== categoryId));
      setMessage({ type: 'success', text: 'Category deleted successfully! (Demo mode)' });
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
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-1">Manage product categories</p>
        </div>
        <Link to="/admin/categories/new" className="btn btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
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
            <span className="label-text font-medium">Search Categories</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or description..."
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

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.id}
            className="card bg-white shadow-lg border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{category.icon || <Grid3X3 className="w-10 h-10 text-blue-600" />}</div>
                <div className="flex space-x-2">
                  <Link
                    to={`/admin/categories/edit/${category.id}`}
                    className="btn btn-ghost btn-sm"
                    title="Edit Category"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="btn btn-ghost btn-sm text-red-600 hover:bg-red-50"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <h3 className="card-title text-slate-800 mb-2">{category.name}</h3>
              <p className="text-gray-600 text-sm">{category.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <Grid3X3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-500 mb-4">No categories found.</p>
          <Link to="/admin/categories/new" className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Category
          </Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="stat bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="stat-title">Total Categories</div>
          <div className="stat-value text-primary">{categories.length}</div>
        </div>
        <div className="stat bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="stat-title">Search Results</div>
          <div className="stat-value text-secondary">{filteredCategories.length}</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;