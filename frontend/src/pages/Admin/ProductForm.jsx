import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, X } from 'lucide-react';
import { uploadToCloudinary } from '../../utils/cloudinary';
import api from '../../utils/api';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    image: '',
    featured: false
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [categories, setCategories] = useState([]); // fetched categories

  const brands = ['Caterpillar', 'Furuno', 'Mustang Survival', 'Michigan Wheel', 'Garmin', 'Peerless'];

  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data); // assuming res.data = [{_id, name}, ...]
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData(prev => ({ ...prev, image: '' }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setMessage({ type: '', text: '' });

  try {
    let imageUrl = formData.image;

    // Upload image to Cloudinary if a new file is selected
    if (imageFile) {
      setIsUploading(true);
      imageUrl = await uploadToCloudinary(imageFile);
      setIsUploading(false);
    }

    // Submit product data to API (send imageUrl inside body)
    const response = await api.post('/products', {
      ...formData,
      image: imageUrl
    });

    // Axios puts response data in `response.data`
    setMessage({ type: 'success', text: 'Product created successfully!' });

    // Reset form
    setFormData({
      title: '',
      description: '',
      price: '',
      category: '',
      brand: '',
      image: '',
      featured: false
    });
    setImageFile(null);
    setImagePreview('');
    
  } catch (error) {
    console.error('Error creating product:', error);

    // If backend sends an error response, it's in `error.response.data`
    if (error.response?.data?.message) {
      setMessage({ type: 'error', text: error.response.data.message });
    } else {
      setMessage({ type: 'error', text: 'Network error occurred' });
    }
  } finally {
    setIsLoading(false);
    setIsUploading(false);
  }
};


  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h1>

        {message.text && (
          <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'} mb-6`}>
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Product Title *</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter product title"
              className="input input-bordered w-full"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Description *</span>
            </label>
            <textarea
              name="description"
              placeholder="Enter product description"
              className="textarea textarea-bordered h-24"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Price, Category, Brand */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Category *</span>
              </label>
              <select
                name="category"
                className="select select-bordered w-full"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
            </div>

            
          </div>

          {/* Image Upload */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Product Image</span>
            </label>
            
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 btn btn-circle btn-sm btn-error"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-2">Click to upload product image</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </div>
            )}
          </div>

          {/* Featured */}
          <div className="form-control">
            <label className="label cursor-pointer justify-start">
              <input
                type="checkbox"
                name="featured"
                className="checkbox checkbox-primary mr-3"
                checked={formData.featured}
                onChange={handleChange}
              />
              <span className="label-text font-medium">Featured Product</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || isUploading}
              className="btn btn-primary"
            >
              {isLoading || isUploading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  {isUploading ? 'Uploading...' : 'Saving...'}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Product
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProductForm;