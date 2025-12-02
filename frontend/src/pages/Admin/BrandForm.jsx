import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, X } from 'lucide-react';
import { uploadToCloudinary } from '../../utils/cloudinary';
import api from '../../utils/api';

const BrandForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: ''
  });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview('');
    setFormData(prev => ({ ...prev, logo: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      let logoUrl = formData.logo;

      // Upload logo to Cloudinary if a new file is selected
      if (logoFile) {
        setIsUploading(true);
        logoUrl = await uploadToCloudinary(logoFile);
        setIsUploading(false);
      }

      // Submit brand data to API
      const response = await api.post("/brands", {
        ...formData,
        logo: logoUrl
      });

      setMessage({ type: 'success', text: 'Brand created successfully!' });
      // Reset form
      setFormData({
        name: '',
        description: '',
        logo: ''
      });
      setLogoFile(null);
      setLogoPreview('');
      
    } catch (error) {
      console.error('Error creating brand:', error);
      setMessage({ type: 'error', text: 'Network error occurred' });
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
        className="bg-white rounded-lg shadow-md border border-marine-aqua/10 p-6"
      >
        <h1 className="font-heading text-2xl font-bold text-marine-navy mb-6 uppercase tracking-wide">Add New Brand</h1>

        {message.text && (
          <div className={`alert ${message.type === 'success' ? 'alert-success bg-green-100 text-green-800 border-green-200' : 'alert-error bg-red-100 text-red-800 border-red-200'} mb-6`}>
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-marine-navy uppercase tracking-wide text-xs">Brand Name *</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter brand name"
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
              placeholder="Enter brand description"
              className="textarea textarea-bordered h-24 border-marine-blue/20 focus:border-marine-aqua focus:ring-1 focus:ring-marine-aqua bg-neutral-graylight/50"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Logo Upload */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-marine-navy uppercase tracking-wide text-xs">Brand Logo</span>
            </label>
            
            {logoPreview ? (
              <div className="relative">
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="w-32 h-32 object-contain rounded-lg border border-marine-aqua/20 bg-white p-4"
                />
                <button
                  type="button"
                  onClick={removeLogo}
                  className="absolute -top-2 -right-2 btn btn-circle btn-sm btn-error bg-red-500 hover:bg-red-600 border-none text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-marine-blue/20 hover:border-marine-aqua/50 rounded-lg p-6 text-center transition-colors bg-neutral-graylight/20">
                <Upload className="w-8 h-8 text-marine-blue/40 mx-auto mb-2" />
                <p className="text-marine-blue/60 mb-2 font-sans">Click to upload brand logo</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="file-input file-input-bordered w-full max-w-xs border-marine-blue/20 focus:border-marine-aqua"
                />
              </div>
            )}
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
              disabled={isLoading || isUploading}
              className="flex items-center gap-2 px-6 py-3 bg-marine-aqua text-marine-navy font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-marine-navy hover:text-white transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading || isUploading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  {isUploading ? 'Uploading...' : 'Saving...'}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Brand
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default BrandForm;