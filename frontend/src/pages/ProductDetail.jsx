import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, Mail } from 'lucide-react';
import axios from 'axios';
import api from '../utils/api';
import MarineLoader from '../components/Common/MarineLoader';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
const [currentImageIndex, setCurrentImageIndex] = useState(0);

const prevImage = () => {
  if (!product?.images || product.images.length === 0) return;
  setCurrentImageIndex(prev =>
    prev === 0 ? product.images.length - 1 : prev - 1
  );
};

const nextImage = () => {
  if (!product?.images || product.images.length === 0) return;
  setCurrentImageIndex(prev =>
    prev === product.images.length - 1 ? 0 : prev + 1
  );
};

// Auto-scroll
useEffect(() => {
  if (!product?.images || product.images.length <= 1) return;

  const interval = setInterval(() => {
    nextImage();
  }, 3000);

  return () => clearInterval(interval);
}, [product?.images]);
 
  // Fetch product details from API
useEffect(() => {
  const fetchProduct = async () => {
    try {
      setLoading(true);

      // ✅ fetch single product
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
      console.log(data.images)

      // ✅ fetch related products by category name
      if (data?.category?.name) {
        const relatedRes = await api.get(
          `/products?category=${encodeURIComponent(data.category.name)}`
        );

        const related = relatedRes.data
          .filter((p) => p._id !== data._id) // exclude current product
          .slice(0, 3); // limit to 3

        setRelatedProducts(related);
      } else {
        setRelatedProducts([]); // no category → no related
      }
    } catch (err) {
      console.error("Error fetching product:", err);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-sans text-xl"><MarineLoader/></p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-marine-navy mb-4">Product Not Found</h2>
          <Link to="/products" className="btn btn-primary">Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
   <section className="py-20 bg-neutral-graylight">
  <div className="container mx-auto px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Back Button */}
      <Link
        to="/products"
        className="inline-flex items-center text-marine-blue hover:text-marine-aqua font-semibold mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* PRODUCT IMAGE */}
        <div className="relative">
   <div className="relative w-full rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
  {product.images && product.images.length > 0 ? (
    product.images.map((img, index) => (
      <motion.img
        key={index}
        src={img}
        alt={product.title}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0 absolute top-0 left-0"
        }`}
      />
    ))
  ) : (
    <img
      src={product.image}
      alt={product.title}
      className="w-full h-full object-cover"
    />
  )}

  {/* Left/Right Buttons */}
  {product.images && product.images.length > 1 && (
    <>
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 hover:bg-white/100 rounded-full p-2 z-20"
      >
        &#8592;
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 hover:bg-white/100 rounded-full p-2 z-20"
      >
        &#8594;
      </button>
    </>
  )}

  {/* Category Badge */}
  <span className="absolute top-2 right-2 bg-white text-marine-navy shadow 
                   px-2 py-0.5 text-xs rounded z-30">
    {product.category?.name || "General"}
  </span>
</div>


        </div>

        {/* PRODUCT INFO */}
        <div>
          {/* Title */}
          <h1 className="font-heading text-4xl font-bold text-marine-navy mb-3">
            {product.title}
          </h1>

          {/* Category Badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="badge bg-marine-aqua text-marine-navy border-none badge-lg shadow">
              {product.category.name}
            </span>
          </div>

          {/* Description */}
          <p className="font-sans text-lg leading-relaxed text-gray-cool mb-8">
            {product.description}
          </p>

          {/* FEATURES CARD */}
          <div className="card bg-white border border-neutral-200 shadow-sm rounded-xl mb-6">
            <div className="card-body">
              <h3 className="card-title text-marine-blue font-heading">
                Product Features
              </h3>

              <ul className="list-disc list-inside space-y-2 text-gray-cool font-sans mt-3">
                <li>Industry-leading performance and reliability</li>
                <li>Corrosion-resistant marine-grade materials</li>
                <li>Compliant with international marine standards</li>
                <li>Warranty + full support coverage</li>
                <li>Professional installation available</li>
              </ul>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+919376502550"
              className="btn bg-marine-aqua text-marine-navy border-none hover:bg-marine-seafoam font-semibold flex-1"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call for Quote
            </a>

            <a
              href="mailto:coronamarine5050@gmail.com"
              className="btn btn-outline border-marine-aqua text-marine-aqua hover:bg-marine-aqua hover:text-marine-navy font-semibold flex-1"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Inquiry
            </a>
          </div>

        </div>
      </div>
    </motion.div>
  </div>
</section>


      {/* Related Products */}
    {/* Related Products */}
{relatedProducts.length > 0 && (
  <section className="py-20 bg-neutral-graylight">
    <div className="container mx-auto px-4">
      <h2 className="font-heading text-3xl font-bold text-marine-navy mb-12 text-center">
        Related Products
      </h2>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
  {relatedProducts.map((product, index) => (
    <motion.div
      key={product._id}
      className="bg-white border border-neutral-200 rounded-xl overflow-hidden 
                 shadow-md hover:shadow-xl hover:border-marine-aqua
                 transition-all duration-300 cursor-pointer group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      viewport={{ once: true }}
    >
      
      {/* IMAGE AREA (fixed ratio, never breaks) */}
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Hover Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-500"></div>

        {/* Hover Button */}
        <Link
          to={`/product/${product._id}`}
          className="absolute inset-0 flex items-center justify-center z-20
                     opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          <span className="px-3 py-1 bg-white text-marine-navy rounded-md text-xs font-semibold shadow">
            Read More →
          </span>
        </Link>

        {/* Category Badge */}
        <span className="absolute top-2 right-2 bg-white text-marine-navy shadow 
                         px-2 py-0.5 text-xs rounded z-30">
          {product.category?.name || "General"}
        </span>
      </div>

      {/* TITLE AREA */}
      <div className="p-2">
        <h3 className="font-heading text-sm font-semibold text-marine-navy line-clamp-1">
          {product.title}
        </h3>
      </div>
    </motion.div>
  ))}
</div>

    </div>
  </section>
)}



    </div>
  );
};

export default ProductDetail;
