import React, { useState, useMemo, useEffect } from "react";
import { Link ,useSearchParams} from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import api from "../utils/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");


  //navigate to home page for categories
const [searchParams] = useSearchParams();
const categoryFromUrl = searchParams.get("category");
useEffect(() => {
  if (categoryFromUrl) setSelectedCategory(categoryFromUrl);
}, [categoryFromUrl]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // show 6 products per page

  // Fetch products + categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get("/products"),   // your backend API
          api.get("/categories") // categories API
        ]);
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  // Filtering
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

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero min-h-96 relative"
        style={{ backgroundImage: "url('/assets/products.png')" }}
      >
        <div className="hero-overlay bg-gradient-to-r from-blue-900/30 via-cyan-800/30 to-teal-900/70"></div>
        <div className="hero-content text-center text-neutral-white">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-heading mb-5 text-5xl font-bold tracking-wide text-marine-light">
              Marine Products
            </h1>
            <p className="font-sans mb-5 text-xl text-marine-aqua">
              Professional-grade marine equipment and supplies
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <a
                href="#catalog"
                className="btn bg-marine-aqua text-white border-none hover:bg-marine-blue"
              >
                Explore Catalog
              </a>
              <a
                href="#contact"
                className="btn bg-marine-light text-marine-navy border-none hover:bg-marine-aqua"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

  {/* Products Section */}
<section className="py-20 bg-marine-light/5">
  <div className="container mx-auto px-4">
    {/* Filters on top */}
    <motion.div
      className="card bg-marine-light/10 shadow-lg mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="card-body flex flex-col md:flex-row md:items-end gap-4">
        {/* Search */}
        <div className="flex-1">
          <label className="label">
            <span className="font-sans label-text font-semibold text-marine-navy">
              Search Products
            </span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="input input-bordered w-full pr-10 border-marine-aqua/50 focus:border-marine-blue"
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
          <label className="label">
            <span className="font-sans label-text font-semibold text-marine-navy">
              Category
            </span>
          </label>
          <select
            className="select w-full select-bordered border-marine-aqua/50 focus:border-marine-blue"
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
            className="btn btn-sm mt-6 bg-marine-aqua text-white border-none hover:bg-marine-blue"
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
        <h2 className="font-heading text-2xl font-bold text-marine-navy">
          Products ({filteredProducts.length})
        </h2>
      </div>

 <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2">
  {paginatedProducts.map((product, index) => (
    <motion.div
      key={product._id}
      className="card h-60 bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >

      {/* IMAGE (4/5 height) */}
      <figure className="h-4/5 w-full overflow-hidden relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* HOVER OVERLAY */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-500"></div>

        {/* READ MORE BUTTON ON HOVER */}
        <Link
          to={`/product/${product._id}`}
          className="absolute inset-0 flex items-center justify-center 
                     opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          <span className="px-3 py-1 bg-white text-marine-navy rounded-md text-xs font-semibold shadow">
            Read More →
          </span>
        </Link>

        {/* CATEGORY BADGE (TOP RIGHT) */}
        <span className="absolute top-2 right-2 badge bg-white text-marine-navy border-none shadow-sm badge-sm z-20">
          {product.category?.name || "General"}
        </span>
      </figure>

      {/* TEXT SECTION (1/5 height) */}
      <div className="h-1/5 p-2">
        <h3 className="font-heading text-sm font-semibold text-marine-navy truncate">
          {product.title}
        </h3>
      </div>

    </motion.div>
  ))}
</div>


      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="font-sanstext-xl text-gray-500">
            No products found matching your criteria.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            className="btn btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`btn btn-sm ${
                currentPage === i + 1 ? "btn-primary" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="btn btn-sm"
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
