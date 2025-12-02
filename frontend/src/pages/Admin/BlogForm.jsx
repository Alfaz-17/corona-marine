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
        author: ''
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
        className="bg-white rounded-lg shadow-md border border-marine-aqua/10 p-6"
      >
        <h1 className="font-heading text-2xl font-bold text-marine-navy mb-6 uppercase tracking-wide">Add New Blog Post</h1>

        {message.text && (
          <div className={`alert ${message.type === 'success' ? 'alert-success bg-green-100 text-green-800 border-green-200' : 'alert-error bg-red-100 text-red-800 border-red-200'} mb-6`}>
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-marine-navy uppercase tracking-wide text-xs">Blog Title *</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter blog post title"
              className="input input-bordered w-full border-marine-blue/20 focus:border-marine-aqua focus:ring-1 focus:ring-marine-aqua bg-neutral-graylight/50"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Excerpt */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-marine-navy uppercase tracking-wide text-xs">Excerpt *</span>
            </label>
            <textarea
              name="excerpt"
              placeholder="Enter a brief excerpt or summary"
              className="textarea textarea-bordered h-20 border-marine-blue/20 focus:border-marine-aqua focus:ring-1 focus:ring-marine-aqua bg-neutral-graylight/50"
              value={formData.excerpt}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Content */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-marine-navy uppercase tracking-wide text-xs">Content *</span>
            </label>
            <textarea
              name="content"
              placeholder="Enter the full blog post content"
              className="textarea textarea-bordered h-48 border-marine-blue/20 focus:border-marine-aqua focus:ring-1 focus:ring-marine-aqua bg-neutral-graylight/50"
              value={formData.content}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Date and Author */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-marine-navy uppercase tracking-wide text-xs">Publish Date *</span>
              </label>
              <input
                type="date"
                name="date"
                className="input input-bordered w-full border-marine-blue/20 focus:border-marine-aqua focus:ring-1 focus:ring-marine-aqua bg-neutral-graylight/50"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-marine-navy uppercase tracking-wide text-xs">Author</span>
              </label>
              <input
                type="text"
                name="author"
                placeholder="Enter author name (optional)"
                className="input input-bordered w-full border-marine-blue/20 focus:border-marine-aqua focus:ring-1 focus:ring-marine-aqua bg-neutral-graylight/50"
                value={formData.author}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Featured Image Upload */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-marine-navy uppercase tracking-wide text-xs">Featured Image</span>
            </label>
            
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg border border-marine-aqua/20"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 btn btn-circle btn-sm btn-error bg-red-500 hover:bg-red-600 border-none text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-marine-blue/20 hover:border-marine-aqua/50 rounded-lg p-6 text-center transition-colors bg-neutral-graylight/20">
                <Upload className="w-8 h-8 text-marine-blue/40 mx-auto mb-2" />
                <p className="text-marine-blue/60 mb-2 font-sans">Click to upload featured image</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
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
                  {isUploading ? 'Uploading...' : 'Publishing...'}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
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