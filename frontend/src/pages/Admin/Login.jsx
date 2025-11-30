import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Lock, Mail, Anchor } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { user, login } = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  // Redirect if already logged in
  if (user) {
    return <Navigate to={from} replace />;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-marine-navy flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-8 border border-marine-aqua/20">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center justify-center mb-4">
              <span className="font-heading text-3xl font-bold text-marine-navy tracking-wide">CORONA MARINE</span>
              <span className="font-sans text-sm text-marine-aqua tracking-wider uppercase font-semibold mt-1">ADMIN PANEL</span>
            </div>
            <h2 className="font-heading text-xl font-bold text-marine-navy uppercase tracking-wide">Admin Login</h2>
            <p className="text-marine-blue mt-2">Sign in to access the admin panel</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="alert alert-error mb-6">
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="font-sans font-semibold text-marine-navy uppercase tracking-wide text-sm">Email Address</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="admin@coronamarine.com"
                  className="w-full px-4 py-2 pl-10 border border-marine-blue/30 rounded focus:border-marine-aqua focus:ring-2 focus:ring-marine-aqua/20 outline-none transition-all"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-marine-aqua" />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="font-sans font-semibold text-marine-navy uppercase tracking-wide text-sm">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 pl-10 pr-10 border border-marine-blue/30 rounded focus:border-marine-aqua focus:ring-2 focus:ring-marine-aqua/20 outline-none transition-all"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-marine-aqua" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-marine-aqua hover:text-marine-navy"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-marine-aqua text-marine-navy font-bold text-sm uppercase tracking-wider rounded hover:bg-marine-navy hover:text-white transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>


        </div>
      </motion.div>
    </div>
  );
};

export default Login;