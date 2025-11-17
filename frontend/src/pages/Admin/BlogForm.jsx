import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, X } from 'lucide-react';
import { uploadToCloudinary } from '../../utils/cloudinary';
import api from '../../utils/api';

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    image: '',
    author: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
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

      // Submit blog data to API
      const response = await api.post("/blogs", {
        ...formData,
        image: imageUrl
      });

     
        setMessage({ type: 'success', text: 'Blog post created successfully!' });
        // Reset form
        setFormData({
          title: '',
          excerpt: '',
          content: '',
          date: new Date().toISOString().split('T')[0],
          image: '',
        });
        setImageFile(null);
        setImagePreview('');
    
    } catch (error) {
      console.error('Error creating blog post:', error);
      setMessage({ type: 'error', text: 'Network error occurred' });
    } finally {
      setIsLoading(false);
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Blog Post</h1>

        {message.text && (
          <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'} mb-6`}>
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Blog Title *</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter blog post title"
              className="input input-bordered w-full"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Excerpt */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Excerpt *</span>
            </label>
            <textarea
              name="excerpt"
              placeholder="Enter a brief excerpt or summary"
              className="textarea textarea-bordered h-20"
              value={formData.excerpt}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Content */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Content *</span>
            </label>
            <textarea
              name="content"
              placeholder="Enter the full blog post content"
              className="textarea textarea-bordered h-48"
              value={formData.content}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Date and Author */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Publish Date *</span>
              </label>
              <input
                type="date"
                name="date"
                className="input input-bordered w-full"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

          
          </div>

          {/* Featured Image Upload */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Featured Image</span>
            </label>
            
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg border border-gray-200"
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
                <p className="text-gray-600 mb-2">Click to upload featured image</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </div>
            )}
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
                  {isUploading ? 'Uploading...' : 'Publishing...'}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Publish Post
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default BlogForm;