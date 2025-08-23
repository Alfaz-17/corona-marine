import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Award, Clock, Users } from 'lucide-react';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import brandsData from '../data/brands.json';
import blogsData from '../data/blogs.json';

const Home = () => {
  const featuredProducts = productsData.filter(product => product.featured);
  const latestBlogs = blogsData.slice(0, 3);

  const stats = [
    { icon: Shield, label: 'Years of Experience', value: '35+' },
    { icon: Award, label: 'Satisfied Clients', value: '1000+' },
    { icon: Clock, label: '24/7 Support', value: 'Available' },
    { icon: Users, label: 'Expert Team', value: '50+' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero min-h-screen relative" style={{
        backgroundImage: 'url(https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg)',
      }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-white">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="mb-5 text-5xl lg:text-7xl font-bold leading-tight">
              Your Trusted <span className="text-cyan-500">Marine Services</span> Partner
            </h1>
            <p className="mb-8 text-xl lg:text-2xl">
              Providing premium marine equipment and exceptional service to the maritime industry for over 35 years
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="btn btn-primary btn-lg">
                View Products <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/contact" className="btn btn-outline btn-lg">
                Get Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <stat.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-slate-800 mb-6">
                Leading Marine Services Provider
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                With over three decades of experience in the marine industry, we specialize in providing 
                high-quality marine equipment, parts, and services to commercial vessels, offshore platforms, 
                and maritime facilities worldwide.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our commitment to excellence and customer satisfaction has made us the preferred choice 
                for marine professionals seeking reliable solutions and expert support.
              </p>
              <Link to="/about" className="btn btn-primary">
                Learn More About Us
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg"
                alt="Marine Operations"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Product Categories
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive range of marine equipment and services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesData.map((category, index) => (
              <motion.div
                key={category.id}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="card-body text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="card-title justify-center text-slate-800">{category.name}</h3>
                  <p className="text-gray-600">{category.description}</p>
                  <div className="card-actions justify-center mt-4">
                    <Link to="/products" className="btn btn-outline btn-sm">
                      View More
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Our most popular and trusted marine solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <figure>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-slate-800">{product.title}</h3>
                  <p className="text-gray-600">{product.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="badge badge-primary">{product.category}</span>
                    <span className="text-lg font-bold text-blue-600">{product.price}</span>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <Link to={`/product/${product.id}`} className="btn btn-primary btn-sm">
                      View Product
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products" className="btn btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Trusted Brands
            </h2>
            <p className="text-xl text-gray-600">
              We partner with industry-leading brands
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {brandsData.map((brand, index) => (
              <motion.div
                key={brand.id}
                className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="card-body items-center text-center p-6">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-16 h-16 object-contain mb-2"
                  />
                  <h4 className="font-semibold text-sm text-slate-800">{brand.name}</h4>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/brands" className="btn btn-primary">
              View All Brands
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Latest News & Insights
            </h2>
            <p className="text-xl text-gray-600">
              Stay updated with marine industry trends and tips
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <figure>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-slate-800">{blog.title}</h3>
                  <p className="text-gray-600">{blog.excerpt}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500">{new Date(blog.date).toLocaleDateString()}</span>
                    <Link to={`/blog/${blog.id}`} className="btn btn-primary btn-sm">
                      Read More
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/blog" className="btn btn-primary">
              View All Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;