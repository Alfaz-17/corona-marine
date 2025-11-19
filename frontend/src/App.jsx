import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Context
import { AuthProvider } from './contexts/AuthContext';

// Auth Components
import RequireAuth from './components/Auth/RequireAuth';

// Layout Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import FloatingCallButton from './components/Common/FloatingCallButton';
import AdminLayout from './components/Admin/AdminLayout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Brands from './pages/Brands';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';

// Admin Pages
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import ProductList from './pages/Admin/ProductList';
import ProductForm from './pages/Admin/ProductForm';
import CategoryList from './pages/Admin/CategoryList';
import CategoryForm from './pages/Admin/CategoryForm';
import BrandList from './pages/Admin/BrandList';
import BrandForm from './pages/Admin/BrandForm';
import BlogList from './pages/Admin/BlogList';
import BlogForm from './pages/Admin/BlogForm';
import ScrollToTop from './components/Common/ScrollToTop';

function App() {

  

  return (
    <AuthProvider>
      <Router>
          <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Routes>
            {/* Admin Login */}
            <Route path="/login" element={<Login />} />
            
            {/* Admin Panel */}
            <Route path="/admin" element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<ProductList />} />
              <Route path="products" element={<ProductList />} />
              <Route path="products/new" element={<ProductForm />} />
              <Route path="products/edit/:id" element={<ProductForm />} />
              <Route path="categories" element={<CategoryList />} />
              <Route path="categories/new" element={<CategoryForm />} />
              <Route path="categories/edit/:id" element={<CategoryForm />} />
              <Route path="brands" element={<BrandList />} />
              <Route path="brands/new" element={<BrandForm />} />
              <Route path="brands/edit/:id" element={<BrandForm />} />
              <Route path="blogs" element={<BlogList />} />
              <Route path="blogs/new" element={<BlogForm />} />
              <Route path="blogs/edit/:id" element={<BlogForm />} />
            </Route>
            
            {/* Public Routes */}
            <Route path="/*" element={
              <>
                <Header  />
                <main className="flex-grow">
                  <AnimatePresence mode="wait">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/brands" element={<Brands />} />
                      <Route path="/brand/:brandName" element={<Brands />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:id" element={<BlogDetail />} />
                      <Route path="/contact" element={<Contact />} />
                    </Routes>
                  </AnimatePresence>
                </main>
                <Footer />
                <FloatingCallButton />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;