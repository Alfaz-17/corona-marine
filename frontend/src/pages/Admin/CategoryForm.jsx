import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import api from '../../utils/api';

const CategoryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await api.post('/categories', formData);
      setMessage({ type: 'success', text: 'Category created successfully!' });
      setFormData({
        name: '',
        description: ''
      });
    } catch (error) {
      if (error.response) {
        setMessage({ type: 'error', text: error.response.data.message || 'Failed to create category' });
      } else {
        setMessage({ type: 'error', text: 'Network error occurred' });
      }
      console.error('Error creating category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md border border-marine-aqua/10 p-6"
      >
        <h1 className="font-heading text-2xl font-bold text-marine-navy mb-6 uppercase tracking-wide">Add New Category</h1>

        {message.text && (
          <div className={`alert ${message.type === 'success' ? 'alert-success bg-green-100 text-green-800 border-green-200' : 'alert-error bg-red-100 text-red-800 border-red-200'} mb-6`}>
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-marine-navy uppercase tracking-wide text-xs">Category Name *</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter category name"
              className="input input-bordered w-full border-marine-blue/20 focus:border-marine-aqua focus:ring-1 focus:ring-marine-aqua bg-neutral-graylight/50"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-marine-navy uppercase tracking-wide text-xs">Description *</span>
            </label>
            <textarea
              name="description"
              placeholder="Enter category description"
              className="textarea textarea-bordered h-24 border-marine-blue/20 focus:border-marine-aqua focus:ring-1 focus:ring-marine-aqua bg-neutral-graylight/50"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-3 border border-marine-blue/30 text-marine-blue font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-marine-blue/5 transition-all"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 bg-marine-aqua text-marine-navy font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-marine-navy hover:text-white transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Category
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CategoryForm;