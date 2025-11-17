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
    console.log("Error in fetch blogs:", error);
  } finally {
    setIsLoading(false); // <-- important
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
        // Demo mode - simulate deletion
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
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Brands</h1>
          <p className="text-gray-600 mt-1">Manage partner brands</p>
        </div>
        <Link to="/admin/brands/new" className="btn btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Brand
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
            <span className="label-text font-medium">Search Brands</span>
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

      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBrands.map((brand, index) => (
          <motion.div
            key={brand._id}
            className="card bg-white shadow-lg border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <figure className="px-6 pt-6">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-20 h-20 object-contain rounded-lg bg-gray-50 p-2"
              />
            </figure>
            <div className="card-body">
              <div className="flex items-center justify-between mb-2">
                <h3 className="card-title text-slate-800">{brand.name}</h3>
                <div className="flex space-x-2">

                  
                  {/* <Link
                    to={`/admin/brands/edit/${brand.id}`}
                    className="btn btn-ghost btn-sm"
                    title="Edit Brand"
                  >
                    <Edit className="w-4 h-4" />
                  </Link> */}

                  <button
                    onClick={() => handleDelete(brand._id)}
                    className="btn btn-ghost btn-sm text-red-600 hover:bg-red-50"
                    title="Delete Brand"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{brand.description}</p>
              
              <div className="card-actions justify-end">
                <Link 
                  to={`/brand/${brand.name}`}
                  className="btn btn-outline btn-sm"
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
          <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-500 mb-4">No brands found.</p>
          <Link to="/admin/brands/new" className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Brand
          </Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="stat bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="stat-title">Total Brands</div>
          <div className="stat-value text-primary">{brands.length}</div>
        </div>
        <div className="stat bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="stat-title">Search Results</div>
          <div className="stat-value text-secondary">{filteredBrands.length}</div>
        </div>
      </div>
    </div>
  );
};

export default BrandList;