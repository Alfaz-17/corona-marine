import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, Eye } from 'lucide-react';
import api from '../../utils/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  const categories = ['Engines', 'Electronics', 'Safety Equipment', 'Propulsion', 'Anchoring', 'Deck Equipment'];

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      console.log(response.data, "product data");
      setProducts(response.data);
    } catch (error) {
      console.log("Error fetching products", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await api.delete(`/products/${productId}`);
      if (response.status === 200) {
        setProducts(products.filter(p => p._id !== productId));
        setMessage({ type: 'success', text: 'Product deleted successfully!' });
        fetchProducts();
      } else {
        setMessage({ type: 'error', text: 'Failed to delete product.' });
      }
    } catch (error) {
      console.log('Error deleting product:', error);
      setMessage({ type: 'error', text: 'Failed to delete product.' });
    }
  };

  const toggleFeatured = async (productId) => {
    try {
      const response = await api.post(`/products/toggle/${productId}`);
      if (response.status === 200) {
        fetchProducts();
      }
    } catch (error) {
      console.log('Backend server not available - demo toggle');
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
          <h1 className="font-heading text-3xl font-bold text-marine-navy uppercase tracking-wide">Products</h1>
          <p className="font-sans text-marine-blue mt-1">Manage your marine products inventory</p>
        </div>
        <Link 
          to="/admin/products/new" 
          className="flex items-center gap-2 px-6 py-3 bg-marine-aqua text-marine-navy font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-marine-navy hover:text-white transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Success/Error Messages */}
      {message.text && (
        <div className={`alert ${message.type === 'success' ? 'alert-success bg-green-100 text-green-800 border-green-200' : 'alert-error bg-red-100 text-red-800 border-red-200'}`}>
          <span>{message.text}</span>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md border border-marine-aqua/10 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-marine-navy uppercase tracking-wide text-xs">Search Products</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title, description, or brand..."
                className="input input-bordered w-full pr-10 border-marine-blue/20 focus:border-marine-aqua focus:ring-1 focus:ring-marine-aqua bg-neutral-graylight/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-marine-blue/50" />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-marine-navy uppercase tracking-wide text-xs">Filter by Category</span>
            </label>
            <select
              className="select select-bordered border-marine-blue/20 focus:border-marine-aqua focus:ring-1 focus:ring-marine-aqua bg-neutral-graylight/50"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {(searchTerm || selectedCategory) && (
          <div className="mt-4">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className="btn btn-outline btn-sm border-marine-blue/30 text-marine-blue hover:bg-marine-blue hover:text-white hover:border-marine-blue"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md border border-marine-aqua/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-marine-navy/5 text-marine-navy font-heading uppercase tracking-wider text-xs">
              <tr>
                <th className="py-4">Product</th>
                <th className="py-4">Category</th>
                <th className="py-4">Brand</th>
                <th className="py-4">Featured</th>
                <th className="py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-marine-aqua/10">
              {filteredProducts.map((product, index) => (
                <motion.tr
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-marine-aqua/5 transition-colors"
                >
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 bg-white p-1 border border-marine-aqua/20">
                          <img src={product.image} alt={product.title} className="object-contain" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-marine-navy">{product.title}</div>
                        <div className="text-xs text-marine-blue/70 truncate max-w-xs font-sans">
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="px-3 py-1 rounded-full bg-marine-blue/10 text-marine-blue text-xs font-bold uppercase tracking-wide border border-marine-blue/20">
                      {product.category?.name}
                    </span>
                  </td>
                  <td className="font-sans text-marine-blue font-medium">{product.brand}</td>
                  <td>
                    <input
                      type="checkbox"
                      className="toggle toggle-sm toggle-accent hover:toggle-primary"
                      checked={product.featured}
                      onChange={() => toggleFeatured(product._id)}
                      style={{ 
                        '--tglbg': product.featured ? '#3DB9C8' : '#E5E7EB',
                        backgroundColor: product.featured ? '#0A3D62' : '#D1D5DB',
                        borderColor: product.featured ? '#0A3D62' : '#D1D5DB'
                      }}
                    />
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/product/${product._id}`}
                        className="p-2 text-marine-blue hover:text-marine-aqua hover:bg-marine-navy/5 rounded-lg transition-colors"
                        title="View Product"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Product"
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-marine-blue/60 font-sans">No products found.</p>
            <Link to="/admin/products/new" className="btn btn-primary mt-4 bg-marine-aqua text-marine-navy border-none hover:bg-marine-navy hover:text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Product
            </Link>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat bg-white rounded-lg shadow-md border border-marine-aqua/10">
          <div className="stat-title text-marine-blue font-bold uppercase tracking-wide text-xs">Total Products</div>
          <div className="stat-value text-marine-navy">{products.length}</div>
        </div>
        <div className="stat bg-white rounded-lg shadow-md border border-marine-aqua/10">
          <div className="stat-title text-marine-blue font-bold uppercase tracking-wide text-xs">Featured Products</div>
          <div className="stat-value text-marine-aqua">
            {products.filter(p => p.featured).length}
          </div>
        </div>
        <div className="stat bg-white rounded-lg shadow-md border border-marine-aqua/10">
          <div className="stat-title text-marine-blue font-bold uppercase tracking-wide text-xs">Categories</div>
          <div className="stat-value text-marine-blue">
            {new Set(products.map(p => p.category)).size}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;