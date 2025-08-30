import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, Eye } from 'lucide-react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  const categories = ['Engines', 'Electronics', 'Safety Equipment', 'Propulsion', 'Anchoring', 'Deck Equipment'];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/admin/products', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        // Demo mode - use static data
        const demoProducts = [
          {
            id: 1,
            title: "Marine Diesel Engine 500HP",
            description: "High-performance marine diesel engine suitable for commercial vessels",
            category: "Engines",
            brand: "Caterpillar",
            image: "https://images.pexels.com/photos/8986070/pexels-photo-8986070.jpeg",
            price: 45000,
            featured: true
          },
          {
            id: 2,
            title: "Ship Navigation Radar System",
            description: "Advanced navigation radar system for marine vessels",
            category: "Electronics",
            brand: "Furuno",
            image: "https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg",
            price: 12500,
            featured: true
          },
          {
            id: 3,
            title: "Marine Safety Life Jackets",
            description: "Professional grade life jackets for marine safety",
            category: "Safety Equipment",
            brand: "Mustang Survival",
            image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg",
            price: 85,
            featured: false
          }
        ];
        setProducts(demoProducts);
      }
    } catch (error) {
      console.log('Backend server not available - using demo data');
      // Demo data fallback
      const demoProducts = [
        {
          id: 1,
          title: "Marine Diesel Engine 500HP",
          description: "High-performance marine diesel engine suitable for commercial vessels",
          category: "Engines",
          brand: "Caterpillar",
          image: "https://images.pexels.com/photos/8986070/pexels-photo-8986070.jpeg",
          price: 45000,
          featured: true
        },
        {
          id: 2,
          title: "Ship Navigation Radar System",
          description: "Advanced navigation radar system for marine vessels",
          category: "Electronics",
          brand: "Furuno",
          image: "https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg",
          price: 12500,
          featured: true
        }
      ];
      setProducts(demoProducts);
    } finally {
      setIsLoading(false);
    }
  };

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
      const response = await fetch(`/admin/products/${productId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setProducts(products.filter(p => p.id !== productId));
        setMessage({ type: 'success', text: 'Product deleted successfully!' });
      } else {
        // Demo mode - simulate deletion
        setProducts(products.filter(p => p.id !== productId));
        setMessage({ type: 'success', text: 'Product deleted successfully! (Demo mode)' });
      }
    } catch (error) {
      console.log('Backend server not available - demo deletion');
      setProducts(products.filter(p => p.id !== productId));
      setMessage({ type: 'success', text: 'Product deleted successfully! (Demo mode)' });
    }

    // Clear message after 3 seconds
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const toggleFeatured = async (productId) => {
    try {
      const product = products.find(p => p.id === productId);
      const response = await fetch(`/admin/products/${productId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featured: !product.featured }),
      });

      if (response.ok) {
        setProducts(products.map(p => 
          p.id === productId ? { ...p, featured: !p.featured } : p
        ));
      } else {
        // Demo mode - simulate toggle
        setProducts(products.map(p => 
          p.id === productId ? { ...p, featured: !p.featured } : p
        ));
      }
    } catch (error) {
      console.log('Backend server not available - demo toggle');
      setProducts(products.map(p => 
        p.id === productId ? { ...p, featured: !p.featured } : p
      ));
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your marine products</p>
        </div>
        <Link to="/admin/products/new" className="btn btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Link>
      </div>

      {/* Success/Error Messages */}
      {message.text && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          <span>{message.text}</span>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Search Products</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title, description, or brand..."
                className="input input-bordered w-full pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Filter by Category</span>
            </label>
            <select
              className="select select-bordered"
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
              className="btn btn-outline btn-sm"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={product.image} alt={product.title} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{product.title}</div>
                        <div className="text-sm opacity-50 truncate max-w-xs">
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-primary badge-sm">
                      {product.category}
                    </span>
                  </td>
                  <td>{product.brand}</td>
                  <td className="font-semibold">${product.price.toLocaleString()}</td>
                  <td>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary toggle-sm"
                      checked={product.featured}
                      onChange={() => toggleFeatured(product.id)}
                    />
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/product/${product.id}`}
                        className="btn btn-ghost btn-sm"
                        title="View Product"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="btn btn-ghost btn-sm"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="btn btn-ghost btn-sm text-red-600 hover:bg-red-50"
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
            <p className="text-xl text-gray-500">No products found.</p>
            <Link to="/admin/products/new" className="btn btn-primary mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Product
            </Link>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="stat-title">Total Products</div>
          <div className="stat-value text-primary">{products.length}</div>
        </div>
        <div className="stat bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="stat-title">Featured Products</div>
          <div className="stat-value text-secondary">
            {products.filter(p => p.featured).length}
          </div>
        </div>
        <div className="stat bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="stat-title">Categories</div>
          <div className="stat-value text-accent">
            {new Set(products.map(p => p.category)).size}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;