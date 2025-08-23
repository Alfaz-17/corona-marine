import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, Mail } from 'lucide-react';
import productsData from '../data/products.json';

const ProductDetail = () => {
  const { id } = useParams();
  const product = productsData.find(p => p.id === parseInt(id));

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

  const relatedProducts = productsData.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div>
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link to="/products" className="btn btn-ghost mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Image */}
              <div>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full rounded-lg shadow-xl"
                />
              </div>

              {/* Product Details */}
              <div>
                <h1 className="text-4xl font-bold text-slate-800 mb-4">
                  {product.title}
                </h1>
                
                <div className="flex items-center gap-4 mb-6">
                  <span className="badge badge-primary badge-lg">{product.category}</span>
                  <span className="text-lg text-gray-600">by {product.brand}</span>
                </div>

                <div className="text-3xl font-bold text-blue-600 mb-6">
                  {product.price}
                </div>

                <div className="prose max-w-none mb-8">
                  <p className="text-lg text-gray-600">
                    {product.description}
                  </p>
                  <p className="text-gray-600">
                    This premium marine equipment is designed to meet the highest industry standards 
                    and provide reliable performance in demanding maritime environments. Our product 
                    comes with comprehensive warranty coverage and full technical support.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="card bg-base-200">
                    <div className="card-body">
                      <h3 className="card-title">Product Features</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Industry-leading performance and reliability</li>
                        <li>Corrosion-resistant marine-grade materials</li>
                        <li>Full compliance with international maritime standards</li>
                        <li>Comprehensive warranty and support package</li>
                        <li>Professional installation services available</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="tel:+1234567890" className="btn btn-primary flex-1">
                      <Phone className="w-4 h-4 mr-2" />
                      Call for Quote
                    </a>
                    <a href="mailto:info@marineserv.com" className="btn btn-outline flex-1">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Inquiry
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-base-200">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-marine-navy mb-12 text-center">
              Related Products
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <figure>
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      className="w-full h-48 object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title text-slate-800">{relatedProduct.title}</h3>
                    <p className="text-gray-600">{relatedProduct.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="badge badge-primary">{relatedProduct.category}</span>
                      <span className="text-lg font-bold text-blue-600">{relatedProduct.price}</span>
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <Link to={`/product/${relatedProduct.id}`} className="btn btn-primary btn-sm">
                        View Product
                      </Link>
                    </div>
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