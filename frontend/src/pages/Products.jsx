import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import brandsData from '../data/brands.json';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesBrand = !selectedBrand || product.brand === selectedBrand;
      
      return matchesSearch && matchesCategory && matchesBrand;
    });
  }, [searchTerm, selectedCategory, selectedBrand]);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero min-h-96 relative" style={{
        backgroundImage: 'url(https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg)',
      }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-white">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="mb-5 text-5xl font-bold">Marine Products</h1>
            <p className="mb-5 text-xl">
              Professional-grade marine equipment and supplies
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="space-y-6">
              <motion.div
                className="card bg-base-200 shadow-lg"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="card-body">
                  <h3 className="card-title text-slate-800">
                    <Filter className="w-5 h-5 mr-2" />
                    Filters
                  </h3>

                  {/* Search */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Search Products</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="input input-bordered w-full pr-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Category</span>
                    </label>
                    <select
                      className="select select-bordered"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">All Categories</option>
                      {categoriesData.map(category => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Brands */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Brand</span>
                    </label>
                    <select
                      className="select select-bordered"
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                    >
                      <option value="">All Brands</option>
                      {brandsData.map(brand => (
                        <option key={brand.id} value={brand.name}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    className="btn btn-outline btn-sm mt-4"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('');
                      setSelectedBrand('');
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  Products ({filteredProducts.length})
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <figure>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-48 object-cover"
                      />
                    </figure>
                    <div className="card-body">
                      <h3 className="card-title text-slate-800">{product.title}</h3>
                      <p className="text-gray-600">{product.description}</p>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="space-y-1">
                          <span className="badge badge-primary badge-sm">{product.category}</span>
                          <div className="text-sm text-gray-500">{product.brand}</div>
                        </div>
                        <span className="text-lg font-bold text-blue-600">{product.price}</span>
                      </div>

                      <div className="card-actions justify-end mt-4">
                        <Link to={`/product/${product.id}`} className="btn btn-primary btn-sm">
                          View Product
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-500">No products found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;