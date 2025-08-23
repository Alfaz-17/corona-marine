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
  <section
  className="hero min-h-screen relative"
  style={{
    backgroundImage: "url('/assets/home.png')",
  }}
>
  {/* Dark navy overlay for contrast */}
  <div className="hero-overlay   "></div>

  <div className="hero-content text-center text-neutral-white">
    <motion.div
      className="max-w-4xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="mb-5 text-5xl lg:text-7xl font-bold leading-tight">
        Your Trusted{" "}
        <span className="text-marine-aqua">Marine Services</span> Partner
      </h1>

      <p className="mb-8 text-xl lg:text-2xl text-neutral-graylight">
        Providing premium marine equipment and exceptional service to the
        maritime industry for over 35 years
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
          <h3 className="text-3xl font-bold text-marine-navy mb-2">
            {stat.value}
          </h3>

          {/* Label in Gray Cool for readability */}
          <p className="text-neutral-graycool">{stat.label}</p>
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
        <h2 className="text-4xl font-bold text-marine-navy mb-6">
          Leading Marine Services Provider
        </h2>

        {/* Paragraphs in Neutral Gray Cool */}
        <p className="text-lg text-neutral-graycool mb-6">
          With over three decades of experience in the marine industry, we specialize in providing 
          high-quality marine equipment, parts, and services to commercial vessels, offshore platforms, 
          and maritime facilities worldwide.
        </p>
        <p className="text-lg text-neutral-graycool mb-8">
          Our commitment to excellence and customer satisfaction has made us the preferred choice 
          for marine professionals seeking reliable solutions and expert support.
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
      {/* Heading in Marine Navy */}
      <h2 className="text-4xl font-bold text-marine-navy mb-4">
        Product Categories
      </h2>

      {/* Subtext in Neutral Gray Cool */}
      <p className="text-xl text-neutral-graycool">
        Comprehensive range of marine equipment and services
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categoriesData.map((category, index) => (
        <motion.div
          key={category.id}
          className="card bg-neutral-white shadow-lg hover:shadow-xl border border-neutral-graylight transition-shadow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="card-body text-center">
            {/* Icon in Marine Aqua for accent */}
            <div className="text-4xl mb-4 text-marine-aqua">{category.icon}</div>

            {/* Title in Marine Navy */}
            <h3 className="card-title justify-center text-marine-navy">
              {category.name}
            </h3>

            {/* Description in Gray Cool */}
            <p className="text-neutral-graycool">{category.description}</p>

            {/* Button with Marine Blue background & hover Navy */}
            <div className="card-actions justify-center mt-4">
              <Link
                to="/products"
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
      {/* Heading in Marine Navy */}
      <h2 className="text-4xl font-bold text-marine-navy mb-4">
        Featured Products
      </h2>

      {/* Subtext in Neutral Gray Cool */}
      <p className="text-xl text-neutral-graycool">
        Our most popular and trusted marine solutions
      </p>
    </motion.div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredProducts.map((product, index) => (
        <motion.div
          key={product.id}
          className="card bg-neutral-white border border-neutral-graylight shadow-lg hover:shadow-xl transition-all hover:border-marine-aqua"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          {/* Product Image */}
          <figure>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
          </figure>

          {/* Card Content */}
          <div className="card-body">
            <h3 className="card-title text-marine-navy">{product.title}</h3>
            <p className="text-neutral-graycool">{product.description}</p>

            <div className="flex justify-between items-center mt-4">
              {/* Badge in Marine Aqua */}
              <span className="badge bg-marine-aqua text-marine-navy border-none">
                {product.category}
              </span>

              {/* Price in Marine Blue */}
              <span className="text-lg font-bold text-marine-blue">
                {product.price}
              </span>
            </div>

            {/* CTA Button */}
            <div className="card-actions justify-end mt-4">
              <Link
                to={`/product/${product.id}`}
                className="btn bg-marine-blue hover:bg-marine-navy text-white border-none btn-sm"
              >
                View Product
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* View All CTA */}
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


      {/* Featured Brands */}
      {/* Trusted Brands */}
<section className="py-20 bg-neutral-graylight">
  <div className="container mx-auto px-4">
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold text-marine-navy mb-4">
        Trusted Brands
      </h2>
      <p className="text-xl text-neutral-graycool">
        We partner with industry-leading brands
      </p>
    </motion.div>

    {/* Brand Cards */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {brandsData.map((brand, index) => (
        <motion.div
          key={brand.id}
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
    {/* Latest News & Insights */}
<section className="py-20 bg-neutral-graylight">
  <div className="container mx-auto px-4">
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Heading */}
      <h2 className="text-4xl font-bold text-marine-navy mb-4">
        Latest News & Insights
      </h2>
      <p className="text-xl text-neutral-graycool">
        Stay updated with marine industry trends and tips
      </p>
    </motion.div>

    {/* Blog Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {latestBlogs.map((blog, index) => (
        <motion.div
          key={blog.id}
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
            <h3 className="card-title text-marine-navy">{blog.title}</h3>
            <p className="text-neutral-graycool">{blog.excerpt}</p>

            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-neutral-graycool">
                {new Date(blog.date).toLocaleDateString()}
              </span>
              <Link
                to={`/blog/${blog.id}`}
                className="btn bg-marine-blue hover:bg-marine-navy text-white border-none btn-sm"
              >
                Read More
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* View All CTA */}
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