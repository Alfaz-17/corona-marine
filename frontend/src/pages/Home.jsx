import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Award, Clock, Users,  } from "lucide-react";
import productsData from "../data/products.json";
import categoriesData from "../data/categories.json";
import brandsData from "../data/brands.json";
import blogsData from "../data/blogs.json";
import api from "../utils/api";
import MarineLoader from "../components/Common/MarineLoader";
import { FiAnchor, FiCpu, FiTool } from "react-icons/fi"; // example icons
import { FaShip, FaFish, FaLifeRing } from "react-icons/fa";

const Home = () => {
  // const latestBlogs = blogsData.slice(0, 3);
  const stats = [
    { icon: Shield, label: "Years of Experience", value: "15+" },
    { icon: Award, label: "Satisfied Clients", value: "1000+" },
    { icon: Clock, label: "24/7 Support", value: "Available" },
    { icon: Users, label: "Expert Team", value: "5+" },
  ];
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const productsData = featuredProducts.filter((product) => product.featured);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

const iconMap = {
  "Anchors": <FiAnchor className="text-6xl text-white mb-4" />,
  "Ships": <FaShip className="text-6xl text-white mb-4" />,
  "Marine Tools": <FiTool className="text-6xl text-white mb-4" />,
  "Electronics": <FiCpu className="text-6xl text-white mb-4" />,
  "Fish": <FaFish className="text-6xl text-white mb-4" />,
  "Safety": <FaLifeRing className="text-6xl text-white mb-4" />,
};

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true)
        const res = await api.get("/products");
        setFeaturedProducts(res.data);
      
      } catch (error) {
        console.error("Error fetching featured products:", error);
       
      }finally{
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await api.get("/categories"); // 🔹 Replace with your API route
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }finally{
        setLoading(false)
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        setLoading(true)
        // adjust API endpoint based on your backend
        const res = await api.get("/blogs");
        setLatestBlogs(res.data);
      } catch (error) {
        console.error("Error fetching latest blogs:", error);
      }finally{
        setLoading(false);
      }
    };

    fetchLatestBlogs();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true)
        // adjust API endpoint based on your backend
        const res = await api.get("/brands");

        setBrands(res.data);
      } catch (error) {
        console.error("Error fetching latest blogs:", error);
      }finally{
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

    if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-sans text-xl"><MarineLoader/></p>
      </div>
    );
  }

  return (
    <div>


      {/* Hero Section */}
<section className="relative hero min-h-[60vh] sm:min-h-screen bg-cover bg-center"
  style={{
    backgroundImage: "url('/assets/marine.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>



        {/* Dark navy overlay for contrast */}
        <div className="hero-overlay bg-marine-navy/90 mix-blend-multiply "></div>

        <div className="hero-content text-center text-neutral-white pt-24 px-4">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-heading mb-5 text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
              Your Trusted{" "}
              <span className="font-sans text-marine-aqua">
                Marine Services
              </span>{" "}
              Partner
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
      <section className="py-20 bg-neutral-graylight" >
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
                With over three decades of expertise in marine technology, we
                deliver advanced automation systems that enhance the efficiency,
                safety, and performance of vessels, offshore operations, and
                port facilities.
              </p>
              <p className="text-lg text-neutral-graycool mb-8">
                From integrated control systems to smart navigation and
                monitoring tools, our innovative solutions are trusted by marine
                professionals worldwide to streamline operations and ensure
                optimal reliability at sea.
              </p>

              {/* Primary Button in Marine Blue */}
              <Link
                to="/about"
                className="btn bg-marine-blue hover:bg-marine-navy text-white border-none"
              >
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
                src="/assets/home.png"
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
      className="relative rounded-2xl overflow-hidden shadow-md border border-neutral-graylight cursor-pointer h-48 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* Background color */}
      <div className="absolute inset-0 bg-marine-blue/40 group-hover:bg-marine-navy/60 transition-colors duration-300"></div>

      {/* Icon and text */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
        <div className="mb-4">
          {iconMap[category.name] || <FiAnchor className="text-6xl text-white" />}
        </div>
        <h3 className="text-white text-xl font-bold mb-2">{category.name}</h3>
        <p className="text-white/80 text-sm">{category.description}</p>
      </div>

      {/* Hover overlay with centered text */}
      <Link
        to={`/products?category=${category._id}`}
        className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
      >
        View Products
      </Link>
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

<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
  {productsData.map((product, index) => (
    <motion.div
      key={product._id}
      className="bg-white border border-neutral-200 rounded-xl overflow-hidden 
                 shadow-md hover:shadow-xl hover:border-marine-aqua transition-all duration-300 
                 cursor-pointer group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      viewport={{ once: true }}
    >

      {/* IMAGE WRAPPER — FIXED RESPONSIVE RATIO */}
      <div className="relative w-full aspect-[4/5] overflow-hidden">

        <motion.img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                       transition-opacity duration-500"></div>

        {/* READ MORE */}
        <Link
          to={`/product/${product._id}`}
          className="absolute inset-0 flex items-center justify-center opacity-0 
                     group-hover:opacity-100 transition-opacity duration-500 z-20"
        >
          <span className="px-3 py-1 bg-white text-marine-navy rounded-md text-xs font-semibold shadow">
            Read More →
          </span>
        </Link>

        {/* CATEGORY BADGE */}
        <span className="absolute top-2 right-2 bg-white text-marine-navy rounded-lg px-2 py-1 text-xs shadow z-30">
          {product.category?.name || "General"}
        </span>
      </div>

      {/* TEXT */}
      <div className="p-3">
        <h3 className="font-bold font-heading text-marine-navy text-sm line-clamp-1">
          {product.title}
        </h3>
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
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
  {brands.map((brand, index) => (
    <motion.div
      key={brand.id}
      className="relative rounded-2xl overflow-hidden shadow-md border border-cyan-100 hover:shadow-2xl hover:border-cyan-300 transition-all duration-300 cursor-pointer h-48"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      <Link to={`/brand/${brand.name}`} className="absolute inset-0 flex items-center justify-center">
        {/* Background image */}
        <img
          src={brand.logo}
          alt={brand.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-black/30"></div>
        {/* Text on top */}
        <h3 className="relative text-white text-lg font-bold text-center px-2">
          {brand.name}
        </h3>
      </Link>
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
                  <h3 className="font-bold font-heading card-title text-marine-navy">
                    {blog.title}
                  </h3>
                  <p className="font-sans text-neutral-graycool">
                    {blog.excerpt}
                  </p>

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
