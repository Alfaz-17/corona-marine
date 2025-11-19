import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import brandsData from '../data/brands.json';
import api from '../utils/api';

const Brands = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [brands, setBrands] = useState([]);

  useEffect(() => {
const fetchBrands = async () => {
  try {
    const res = await api.get("/brands");
    console.log(res.data);
    setBrands(res.data);
  } catch (error) {
    console.log("Error in fetch blogs:", error);
  } finally {
    setIsLoading(false); // <-- important
  }
};

    fetchBrands();
  }, []);




  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero min-h-96 relative"
        style={{
          backgroundImage:
            "url('/assets/home.jpg')",
        }}
      >
        <div className="hero-overlay bg-gradient-to-r from-blue-900/30 via-cyan-800/30 to-teal-900/70"></div>
        <div className="hero-content text-center text-white">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-heading mb-5 text-5xl font-bold drop-shadow-lg">
              Our Trusted Brands
            </h1>
            <p className="font-sans mb-5 text-xl text-marine-aqua">
              We partner with industry-leading manufacturers worldwide
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search */}
      <section className="py-12 bg-base-100">
        <div className="container mx-auto px-4">
         

          {/* Brands Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
  {brands.map((brand, index) => (
    <motion.div
      key={brand.id}
      className="relative rounded-2xl overflow-hidden shadow-md border border-cyan-100 hover:shadow-2xl hover:border-cyan-300 transition-all duration-300 cursor-pointer h-48"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      <Link to={`/brand/${brand.name}`} className="absolute inset-0 flex items-center justify-center">
        {/* Background image */}
        <img
          src={brand.logo}
          alt={brand.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-black/30"></div>
        {/* Text on top */}
        <h3 className="relative text-white text-lg font-bold text-center px-2">
          {brand.name}
        </h3>
      </Link>
    </motion.div>
  ))}
</div>



    
        </div>
      </section>
    </div>
  );
};

export default Brands;
