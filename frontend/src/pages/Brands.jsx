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
            "url(https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg)",
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.id}
                className="card bg-base-100 shadow-lg border border-cyan-100 hover:shadow-xl hover:border-cyan-300 transition-all cursor-pointer flex flex-col items-center p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <Link to={`/brand/${brand.name}`} className="flex flex-col items-center">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-24 h-24 object-contain mb-4"
                  />
                  <h3 className="font-heading text-center text-lg font-semibold text-slate-800">
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
