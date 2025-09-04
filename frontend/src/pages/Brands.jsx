import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ExternalLink } from 'lucide-react';
import brandsData from '../data/brands.json';
import productsData from '../data/products.json';

const Brands = () => {
  const { brandName } = useParams();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBrands = useMemo(() => {
    return brandsData.filter(brand =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const getBrandProducts = (brandName) => {
    return productsData.filter(product => product.brand === brandName);
  };

  if (brandName) {
    const brand = brandsData.find(b => b.name.toLowerCase() === brandName.toLowerCase());
    const brandProducts = getBrandProducts(brandName);

    if (!brand) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold text-marine-navy mb-4">Brand Not Found</h2>
            <Link to="/brands" className="btn btn-primary">Back to Brands</Link>
          </div>
        </div>
      );
    }

    return (
     <div>
  {/* Brand Hero */}
  <section className="py-20 bg-base-200">
    <div className="container mx-auto px-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <img
          src={brand.logo}
          alt={brand.name}
          className="w-32 h-32 object-contain mx-auto mb-6"
        />
        <h1 className="font-heading text-4xl font-bold text-slate-800 mb-4">
          {brand.name}
        </h1>
        <p className="font-sans text-xl text-gray-600 max-w-2xl mx-auto">
          {brand.description}
        </p>
      </motion.div>
    </div>
  </section>

  {/* Brand Products */}
  <section className="py-20 bg-base-100">
    <div className="container mx-auto px-4">
      <h2 className="font-heading text-3xl font-bold text-slate-800 mb-12 text-center">
        {brand.name} Products ({brandProducts.length})
      </h2>

      {brandProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow border border-cyan-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <figure className="bg-cyan-50">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="font-heading card-title text-slate-800">{product.title}</h3>
                <p className="font-sans text-gray-600">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-sans badge bg-cyan-600 text-white border-0">
                    {product.category}
                  </span>
                  <span className="font-sans text-lg font-bold text-cyan-700">
                    {product.price}
                  </span>
                </div>
                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/product/${product.id}`}
                    className="btn bg-cyan-600 hover:bg-cyan-700 text-white btn-sm rounded-xl"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="font-sans text-xl text-gray-500">
            No products available for this brand yet.
          </p>
        </div>
      )}
    </div>
  </section>
</div>

    );
  }

  return (
    <div>
      {/* Hero Section */}
     <section
  className="hero min-h-96 relative"
  style={{
    backgroundImage:
      "url(https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg)",
  }}
>
  {/* Marine overlay tint */}
  <div className="hero-overlay  bg-gradient-to-r from-blue-900/30 via-cyan-800/30 to-teal-900/70"></div>

  <div className="hero-content text-center text-white">
    <motion.div
      className="max-w-4xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="font-heading mb-5 text-5xl font-bold  drop-shadow-lg">
        Our Trusted Brands
      </h1>
      <p className="font-sans mb-5 text-xl text-marine-aqua">
        We partner with industry-leading manufacturers worldwide
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
          placeholder="Search brands..."
          className="input input-bordered w-full pr-10 focus:border-cyan-500 focus:ring-cyan-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-500" />
      </div>
    </motion.div>

    {/* Brands Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredBrands.map((brand, index) => (
        <motion.div
          key={brand.id}
          className="card bg-base-100 shadow-lg border border-cyan-100 hover:shadow-xl hover:border-cyan-300 transition-all cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <Link to={`/brand/${brand.name}`} className="block">
            <figure className="px-6 pt-6">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-24 h-24 object-contain mx-auto"
              />
            </figure>
            <div className="card-body text-center">
              <h3 className="font-heading card-title justify-center text-slate-800">
                {brand.name}
              </h3>
              <p className="font-sans text-cyan-700">{brand.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="font-sans text-sm text-cyan-600">
                  {getBrandProducts(brand.name).length} Products
                </span>
                <ExternalLink className="w-4 h-4 text-cyan-500" />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>

    {filteredBrands.length === 0 && (
      <div className="text-center py-12">
        <p className="font-sans text-xl text-cyan-600">
          No brands found matching your search.
        </p>
      </div>
    )}
  </div>
</section>

    </div>
  );
};

export default Brands;