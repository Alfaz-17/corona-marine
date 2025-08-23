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
 <section
  className="hero min-h-96 relative"
   style={{
       backgroundImage: "url('/assets/products.png')",

  }}
>
  {/* Overlay with marine navy tint */}
  <div className="hero-overlay  bg-gradient-to-r from-blue-900/30 via-cyan-800/30 to-teal-900/70 "></div>

  {/* Content */}
  <div className="hero-content text-center text-neutral-white">
    <motion.div
      className="max-w-4xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="mb-5 text-5xl font-bold tracking-wide text-marine-light">
        Marine Products
      </h1>
      <p className="mb-5 text-xl text-marine-aqua">
        Professional-grade marine equipment and supplies
      </p>
      <div className="flex justify-center gap-4 mt-6">
        <a href="#catalog" className="btn bg-marine-aqua text-white border-none hover:bg-marine-blue">
          Explore Catalog
        </a>
        <a href="#contact" className="btn bg-marine-light text-marine-navy border-none hover:bg-marine-aqua">
          Contact Us
        </a>
      </div>
    </motion.div>
  </div>
</section>


     <section className="py-20 bg-marine-light/5">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar Filters */}
      <div className="space-y-6">
        <motion.div
          className="card bg-marine-light/10 shadow-lg "
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="card-body">
            <h3 className="card-title text-marine-navy">
              <Filter className="w-5 h-5 mr-2 text-marine-aqua" />
              Filters
            </h3>

            {/* Search */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-marine-navy">
                  Search Products
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="input input-bordered w-full pr-10 border-marine-aqua/50 focus:border-marine-blue"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-marine-aqua" />
              </div>
            </div>

            {/* Categories */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-marine-navy">
                  Category
                </span>
              </label>
              <select
                className="select w-full select-bordered border-marine-aqua/50 focus:border-marine-blue"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categoriesData.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Brands */}
            <div className="form-control">
              <label className="label">
                <span className="label-text  font-semibold text-marine-navy">
                  Brand
                </span>
              </label>
              <select
                className="select w-full select-bordered border-marine-aqua/50 focus:border-marine-blue"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">All Brands</option>
                {brandsData.map((brand) => (
                  <option key={brand.id} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="btn btn-sm mt-4 bg-marine-aqua text-white border-none hover:bg-marine-blue"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
                setSelectedBrand("");
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
          <h2 className="text-2xl font-bold text-marine-navy">
            Products ({filteredProducts.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="card bg-white shadow-lg hover:shadow-xl transition-shadow "
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
                <h3 className="card-title text-marine-navy">
                  {product.title}
                </h3>
                <p className="text-gray-600">{product.description}</p>

                <div className="flex justify-between items-center mt-4">
                  <div className="space-y-1">
                    <span className="badge bg-marine-aqua text-white border-none badge-sm">
                      {product.category}
                    </span>
                    <div className="text-sm text-gray-500">{product.brand}</div>
                  </div>
                  <span className="text-lg font-bold text-marine-blue">
                    {product.price}
                  </span>
                </div>

                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/product/${product.id}`}
                    className="btn btn-sm bg-marine-aqua text-white border-none hover:bg-marine-blue"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">
              No products found matching your criteria.
            </p>
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