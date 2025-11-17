import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Award, Clock, Users, Loader } from 'lucide-react';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import brandsData from '../data/brands.json';
import blogsData from '../data/blogs.json';
import api from '../utils/api';

const Home = () => {
  // const latestBlogs = blogsData.slice(0, 3);
  const stats = [
    { icon: Shield, label: 'Years of Experience', value: '15+' },
    { icon: Award, label: 'Satisfied Clients', value: '1000+' },
    { icon: Clock, label: '24/7 Support', value: 'Available' },
    { icon: Users, label: 'Expert Team', value: '5+' },
  ];
    const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const productsData = featuredProducts.filter(product => product.featured);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [brands, setBrands] = useState([]);

    useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await api.get("/products");
        setFeaturedProducts(res.data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } 
    };

    fetchFeaturedProducts();
  }, []);

   useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories"); // 🔹 Replace with your API route
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  
  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        // adjust API endpoint based on your backend
        const res = await api.get("/blogs"); 
        setLatestBlogs(res.data);
      } catch (error) {
        console.error("Error fetching latest blogs:", error);
      }
    };

    fetchLatestBlogs();
  }, []);

   useEffect(() => {
    const fetchBrands = async () => {
      try {
        // adjust API endpoint based on your backend
        const res = await api.get("/brands");
      
        setBrands(res.data);
      } catch (error) {
        console.error("Error fetching latest blogs:", error);
      }
    };

    fetchBrands();
  }, []);

  
  return (
    <div>
      {/* Hero Section */}
  <section
  className="hero min-h-screen relative"
  style={{
    backgroundImage: "url('/assets/marine.png')",
  }}
>
  {/* Dark navy overlay for contrast */}
  <div className="hero-overlay bg-neutral-navy opacity-70"></div>

  <div className="hero-content text-center text-neutral-white">
    <motion.div
      className="max-w-4xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="font-heading mb-5 text-5xl lg:text-7xl font-bold leading-tight">
        Your Trusted{" "}
        <span className="font-sans text-marine-aqua">Marine Services</span> Partner
      </h1>

      <p className="font-sans mb-8 text-xl lg:text-2xl ">
        Providing premium marine equipment and exceptional service to the
        maritime industry for over 15 years
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {/* Primary CTA */}
        <Link
          to="/products"
          className="btn btn-lg rounded-2xl bg-marine-aqua text-marine-navy font-semibold hover:bg-marine-seafoam transition"
        >
          View Products <ArrowRight className="ml-2 w-5 h-5" />
        </Link>

        {/* Secondary CTA */}
        <Link
          to="/contact"
          className="btn btn-lg rounded-2xl border border-marine-aqua text-marine-aqua hover:bg-marine-blue hover:text-neutral-white transition"
        >
          Get Quote
        </Link>
      </div>
    </motion.div>
  </div>
</section>


      {/* Stats Section */}
    <section className="py-20 bg-neutral-white">
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
          {/* Icon in Marine Aqua */}
          <stat.icon className="w-12 h-12 text-marine-aqua mx-auto mb-4" />

          {/* Number in Marine Navy for strength */}
          <h3 classname="font-bold font-headingtext-3xl font-heading  text-marine-navy mb-2">
            {stat.value}
          </h3>

          {/* Label in Gray Cool for readability */}
          <p className="font-sans text-neutral-graycool">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* About Preview */}
    <section className="py-20 bg-neutral-graylight">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        {/* Title in Marine Navy */}
      <h2 className="font-heading text-4xl font-bold text-marine-navy mb-6">
  Experts in Marine Automation Solutions
</h2>

{/* Paragraphs in Neutral Gray Cool */}
<p className="text-lg text-neutral-graycool mb-6">
  With over three decades of expertise in marine technology, we deliver advanced automation systems 
  that enhance the efficiency, safety, and performance of vessels, offshore operations, and port facilities.
</p>
<p className="text-lg text-neutral-graycool mb-8">
  From integrated control systems to smart navigation and monitoring tools, our innovative solutions are 
  trusted by marine professionals worldwide to streamline operations and ensure optimal reliability at sea.
</p>


        {/* Primary Button in Marine Blue */}
        <Link to="/about" className="btn bg-marine-blue hover:bg-marine-navy text-white border-none">
          Learn More About Us
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        {/* Image framed with Aqua border for brand accent */}
        <img
          src="https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg"
          alt="Marine Operations"
          className="rounded-lg shadow-xl border-4 border-marine-aqua"
        />
      </motion.div>
    </div>
  </div>
</section>


      {/* Product Categories */}
 <section className="py-20 bg-neutral-graylight">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading  text-4xl font-bold text-marine-navy mb-4">
            Product Categories
          </h2>
          <p className="text-xl text-neutral-graycool">
            Comprehensive range of marine equipment and services
          </p>
        </motion.div>

        {/* Categories Grid */}
      {/* Categories Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {categories.slice(0, 6).map((category, index) => (
    <motion.div
      key={category._id}
      className="card bg-neutral-white shadow-lg hover:shadow-xl border border-neutral-graylight transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="card-body text-center">
        {/* Icon OR Image */}
        {/* {category.icon ? (
          <div className="text-4xl mb-4 text-marine-aqua">
            {category.icon}
          </div>
        ) : (
          <img
            src={category.image}
            alt={category.name}
            className="h-16 mx-auto mb-4 object-contain"
          />
        )} */}

        <h3 className="font-bold font-heading card-title justify-center text-marine-navy">
          {category.name}
        </h3>
        <p className="text-neutral-graycool">{category.description}</p>

        <div className="card-actions justify-center mt-4">
          <Link
            to={`/products?category=${category._id}`}
            className="btn bg-marine-blue hover:bg-marine-navy text-white border-none btn-sm"
          >
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
   {/* Featured Products */}
 <section className="py-20 bg-neutral-graylight">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl font-bold text-marine-navy mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-neutral-graycool">
            Our most popular and trusted marine solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsData.map((product, index) => (
            <motion.div
                key={product._id}
                className="card bg-neutral-white border border-neutral-graylight shadow-lg hover:shadow-xl transition-all hover:border-marine-aqua"
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
                  <h3 className="font-bold font-heading card-title text-marine-navy">{product.title}</h3>
                  <p className="text-neutral-graycool">{product.description}</p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="font-sans badge bg-marine-aqua text-marine-navy border-none">
                      {product.category?.name || "General"}
                    </span>
                    <span className="text-lg font-bold text-marine-blue">
                      ${product.price}
                    </span>
                  </div>

                  <div className="card-actions justify-end mt-4">
                    <Link
                      to={`/product/${product._id}`}
                      className="btn bg-marine-blue hover:bg-marine-navy text-white border-none btn-sm"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="btn bg-marine-blue hover:bg-marine-navy text-white border-none"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>


      {/* Trusted Brands */}
<section className="py-20 bg-neutral-graylight">
  <div className="container mx-auto px-4">
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="font-heading text-4xl font-bold text-marine-navy mb-4">
        Trusted Brands
      </h2>
      <p className="text-xl text-neutral-graycool">
        We partner with industry-leading brands
      </p>
    </motion.div>

    {/* Brand Cards */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {brands.map((brand, index) => (
        <motion.div
          key={brand._id}
          className="card bg-neutral-white border border-neutral-graylight shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
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
            <h4 className="font-semibold text-sm text-marine-navy">
              {brand.name}
            </h4>
          </div>
        </motion.div>
      ))}
    </div>

    {/* View All CTA */}
    <div className="text-center mt-12">
      <Link
        to="/brands"
        className="btn bg-marine-blue hover:bg-marine-navy text-white border-none"
      >
        View All Brands
      </Link>
    </div>
  </div>
</section>


      {/* Latest Blog Posts */}
<section className="py-20 bg-neutral-graylight">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl font-bold text-marine-navy mb-4">
            Latest News & Insights
          </h2>
          <p className="font-sans text-xl text-neutral-graycool">
            Stay updated with marine industry trends and tips
          </p>
        </motion.div>

   
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                className="card bg-neutral-white border border-neutral-graylight shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <figure>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="font-bold font-heading card-title text-marine-navy">{blog.title}</h3>
                  <p className="font-sans text-neutral-graycool">{blog.excerpt}</p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="font-sans text-sm text-neutral-graycool">
                      {new Date(blog.date).toLocaleDateString()}
                    </span>
                    <Link
                      to={`/blog/${blog._id}`}
                      className="btn bg-marine-blue hover:bg-marine-navy text-white border-none btn-sm"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
     
        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="btn bg-marine-blue hover:bg-marine-navy text-white border-none"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>

    </div>
  );
};

export default Home;