import React, { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import api from "../utils/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  
  useEffect(() => {
    if (categoryFromUrl) setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get("/products"),
          api.get("/categories")
        ]);
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        !selectedCategory ||
        (product.category?._id === selectedCategory ||
          product.category?.name === selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section
        className="hero min-h-96 relative"
        style={{ backgroundImage: "url('/assets/products.png')" }}
      >
        <div className="hero-overlay bg-marine-navy/90 mix-blend-multiply"></div>
        <div className="hero-content text-center text-neutral-white relative z-10">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading mb-5 text-5xl font-bold tracking-wider text-white uppercase">
              Marine Products
            </h1>
            <p className="font-sans mb-5 text-xl text-neutral-graylight">
              Professional-grade marine equipment and supplies
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-neutral-graylight">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <motion.div
            className="bg-white rounded-lg shadow-md mb-8 border border-marine-aqua/10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-6 flex flex-col md:flex-row md:items-end gap-4">
              {/* Search */}
              <div className="flex-1">
                <label className="block mb-2">
                  <span className="font-sans font-semibold text-marine-navy uppercase tracking-wide text-sm">
                    Search Products
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 border border-marine-blue/30 rounded focus:border-marine-aqua focus:ring-2 focus:ring-marine-aqua/20 outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-marine-aqua" />
                </div>
              </div>

              {/* Category */}
              <div className="w-full md:w-64">
                <label className="block mb-2">
                  <span className="font-sans font-semibold text-marine-navy uppercase tracking-wide text-sm">
                    Category
                  </span>
                </label>
                <select
                  className="w-full px-4 py-2 border border-marine-blue/30 rounded focus:border-marine-aqua focus:ring-2 focus:ring-marine-aqua/20 outline-none transition-all"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Button */}
              <div className="flex-shrink-0">
                <button
                  className="px-6 py-2 bg-marine-aqua text-marine-navy font-bold text-sm uppercase tracking-wider rounded hover:bg-white transition-all shadow-md"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("");
                    setCurrentPage(1);
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </motion.div>

          {/* Product Grid */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-2xl font-bold text-marine-navy uppercase tracking-wide">
                Products ({filteredProducts.length})
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
              {paginatedProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:border-marine-aqua transition-all duration-300 group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="relative w-full aspect-[4/5] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-marine-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Link
                      to={`/product/${product._id}`}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
                    >
                      <span className="px-3 py-1 bg-marine-aqua text-marine-navy rounded-md text-xs font-bold shadow uppercase tracking-wide">
                        View Details →
                      </span>
                    </Link>
                    <span className="absolute top-2 right-2 bg-white text-marine-navy shadow px-2 py-0.5 rounded text-xs z-30 font-semibold">
                      {product.category?.name || "General"}
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-bold text-marine-navy line-clamp-2 font-heading">
                      {product.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="font-sans text-xl text-marine-blue">
                  No products found matching your criteria.
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                <button
                  className="px-4 py-2 bg-white border border-marine-aqua/30 text-marine-navy rounded hover:bg-marine-aqua hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded font-semibold transition-all ${
                      currentPage === i + 1
                        ? "bg-marine-aqua text-marine-navy"
                        : "bg-white border border-marine-aqua/30 text-marine-navy hover:bg-marine-aqua/10"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  className="px-4 py-2 bg-white border border-marine-aqua/30 text-marine-navy rounded hover:bg-marine-aqua hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
