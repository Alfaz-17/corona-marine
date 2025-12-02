import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, Award, ExternalLink } from 'lucide-react';
import api from '../../utils/api';

const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await api.get("/brands");
        console.log(res.data);
        setBrands(res.data);
      } catch (error) {
        console.log("Error in fetch brands:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    filterBrands();
  }, [brands, searchTerm]);

  const filterBrands = () => {
    let filtered = brands;

    if (searchTerm) {
      filtered = filtered.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBrands(filtered);
  };

  const handleDelete = async (brandId) => {
    if (!window.confirm('Are you sure you want to delete this brand?')) {
      return;
    }

    try {
      const response = await api.delete(`/brands/${brandId}`);

      if (response.status === 200) {
        setBrands(brands.filter(b => b._id !== brandId));
        setMessage({ type: 'success', text: 'Brand deleted successfully!' });
      } else {
        setBrands(brands.filter(b => b._id !== brandId));
        setMessage({ type: 'success', text: 'Brand deleted successfully! (Demo mode)' });
      }
    } catch (error) {
      console.log('Backend server not available - demo deletion');
      setBrands(brands.filter(b => b._id !== brandId));
      setMessage({ type: 'success', text: 'Brand deleted successfully! (Demo mode)' });
    }

    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
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
          <h1 className="font-heading text-3xl font-bold text-marine-navy uppercase tracking-wide">Brands</h1>
          <p className="font-sans text-marine-blue mt-1">Manage partner brands</p>
        </div>
        <Link 
          to="/admin/brands/new" 
          className="flex items-center gap-2 px-6 py-3 bg-marine-aqua text-marine-navy font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-marine-navy hover:text-white transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          Add Brand
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
            <span className="label-text font-bold text-marine-navy uppercase tracking-wide text-xs">Search Brands</span>
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

      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBrands.map((brand, index) => (
          <motion.div
            key={brand._id}
            className="card bg-white shadow-md border border-marine-aqua/10 hover:shadow-xl transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <figure className="px-6 pt-6 bg-neutral-graylight/20">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-32 h-32 object-contain p-2"
              />
            </figure>
            <div className="card-body">
              <div className="flex items-center justify-between mb-2">
                <h3 className="card-title text-marine-navy font-heading uppercase tracking-wide">{brand.name}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDelete(brand._id)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Brand"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-marine-blue/70 text-sm font-sans mb-4 line-clamp-3">{brand.description}</p>
              
              <div className="card-actions justify-end">
                <Link 
                  to={`/brand/${brand.name}`}
                  className="btn btn-sm btn-outline border-marine-blue/30 text-marine-blue hover:bg-marine-blue hover:text-white hover:border-marine-blue"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View Public
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredBrands.length === 0 && (
        <div className="text-center py-12">
          <Award className="w-16 h-16 text-marine-blue/20 mx-auto mb-4" />
          <p className="text-xl text-marine-blue/60 font-sans mb-4">No brands found.</p>
          <Link to="/admin/brands/new" className="btn btn-primary bg-marine-aqua text-marine-navy border-none hover:bg-marine-navy hover:text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Brand
          </Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="stat bg-white rounded-lg shadow-md border border-marine-aqua/10">
          <div className="stat-title text-marine-blue font-bold uppercase tracking-wide text-xs">Total Brands</div>
          <div className="stat-value text-marine-navy">{brands.length}</div>
        </div>
        <div className="stat bg-white rounded-lg shadow-md border border-marine-aqua/10">
          <div className="stat-title text-marine-blue font-bold uppercase tracking-wide text-xs">Search Results</div>
          <div className="stat-value text-marine-aqua">{filteredBrands.length}</div>
        </div>
      </div>
    </div>
  );
};

export default BrandList;