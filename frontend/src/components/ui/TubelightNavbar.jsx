import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Search, ChevronRight, Home, ShoppingBag, Info, BookOpen, Star, PhoneCall } from "lucide-react";
import api from "../../utils/api";

const TubelightNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Products", path: "/products", hasDropdown: true, icon: ShoppingBag },
    { name: "Brands", path: "/brands", icon: Star },
    { name: "About", path: "/about", icon: Info },
    { name: "Blog", path: "/blog", icon: BookOpen },
    { name: "Contact", path: "/contact", icon: PhoneCall },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? "bg-marine-navy/80 backdrop-blur-md shadow-lg border-b border-marine-aqua/20 py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group relative z-10">
              <div className="flex flex-col">
                <span
                  className={`font-heading font-bold text-white tracking-wide leading-none transition-all duration-500 ${
                    scrolled ? "text-lg md:text-xl" : "text-xl md:text-2xl"
                  }`}
                >
                  CORONA
                </span>
                <span
                  className={`font-sans text-marine-aqua tracking-[0.2em] uppercase font-semibold transition-all duration-500 ${
                    scrolled ? "text-[9px] md:text-[10px]" : "text-[10px] md:text-xs"
                  }`}
                >
                  MARINE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Tubelight Style */}
            <nav className="hidden lg:flex items-center bg-marine-navy/40 backdrop-blur-sm px-2 py-1.5 rounded-full border border-white/10 shadow-inner">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                const Icon = link.icon;
                
                return (
                  <div key={link.name} className="relative group">
                    <Link
                      to={link.path}
                      className={`relative px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                        active
                          ? "text-marine-navy bg-marine-aqua shadow-[0_0_20px_rgba(61,185,200,0.5)]"
                          : "text-white hover:text-marine-aqua hover:bg-white/5"
                      }`}
                    >
                      <span className="relative z-10">{link.name}</span>
                      {link.hasDropdown && <ChevronDown className="w-3 h-3 relative z-10" />}
                    </Link>

                    {/* Dropdown Menu */}
                    {link.hasDropdown && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pt-2">
                        <div className="bg-marine-navy/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-marine-aqua/20 overflow-hidden p-2">
                          {categories.map((category) => (
                            <Link
                              key={category._id}
                              to={`/products?category=${category.slug || category._id}`}
                              className="block px-4 py-3 text-sm font-semibold text-white hover:bg-marine-aqua hover:text-marine-navy rounded-xl transition-all"
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                className="p-2 rounded-full text-white hover:text-marine-aqua hover:bg-white/10 transition-all"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link
                to="/contact"
                className="px-5 py-2 bg-marine-aqua text-marine-navy font-bold text-sm uppercase tracking-wider rounded-full hover:bg-white hover:text-marine-navy transition-all shadow-lg hover:shadow-marine-aqua/30"
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-white hover:text-marine-aqua transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar - Premium Design */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-marine-navy/80 backdrop-blur-md z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full sm:w-96 bg-gradient-to-b from-marine-navy via-marine-navy to-marine-blue shadow-2xl z-50 flex flex-col border-l border-marine-aqua/10"
            >
              {/* Header */}
              <div className="relative p-6 border-b border-white/10 bg-marine-navy/50 backdrop-blur-sm flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-heading text-2xl font-bold text-white tracking-wide">
                    CORONA
                  </span>
                  <span className="font-sans text-xs text-marine-aqua tracking-[0.2em] uppercase font-semibold">
                    MARINE
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation */}
              <div className="flex-1 overflow-y-auto py-6 px-4">
                <div className="mb-6 px-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-neutral-graycool focus:outline-none focus:border-marine-aqua/50 transition-all"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-graycool" />
                  </div>
                </div>
                <nav className="space-y-2">
                  {navLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {link.hasDropdown ? (
                          <div className="overflow-hidden rounded-xl bg-white/5 border border-white/5">
                            <button
                              onClick={() =>
                                setActiveDropdown(activeDropdown === link.name ? null : link.name)
                              }
                              className={`w-full flex items-center justify-between px-4 py-4 text-left font-bold text-white hover:bg-white/5 transition-all ${
                                location.pathname === link.path ? "text-marine-aqua" : ""
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <Icon className="w-5 h-5 text-marine-aqua" />
                                <span className="uppercase tracking-wide">{link.name}</span>
                              </div>
                              <ChevronRight
                                className={`w-5 h-5 transition-transform ${
                                  activeDropdown === link.name ? "rotate-90" : ""
                                }`}
                              />
                            </button>
                            <AnimatePresence>
                              {activeDropdown === link.name && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div className="px-4 pb-4 space-y-1 border-t border-white/5 pt-2">
                                    {categories.map((category) => (
                                      <Link
                                        key={category._id}
                                        to={`/products?category=${category.slug || category._id}`}
                                        className="block px-4 py-3 text-neutral-graycool hover:text-white hover:bg-white/10 text-sm font-medium rounded-lg transition-all"
                                        onClick={() => setIsOpen(false)}
                                      >
                                        {category.name}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            to={link.path}
                            className={`flex items-center gap-3 px-4 py-4 rounded-xl font-bold text-white hover:bg-white/10 transition-all uppercase tracking-wide border border-transparent hover:border-white/10 ${
                              location.pathname === link.path ? "bg-marine-aqua/20 text-marine-aqua border-marine-aqua/20" : ""
                            }`}
                            onClick={() => setIsOpen(false)}
                          >
                            <Icon className={`w-5 h-5 ${location.pathname === link.path ? "text-marine-aqua" : "text-neutral-graycool"}`} />
                            {link.name}
                          </Link>
                        )}
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* Footer CTA */}
              <div className="p-6 bg-marine-blue/30 border-t border-white/10 backdrop-blur-sm space-y-4">
                <Link
                  to="/contact"
                  className="block w-full py-4 bg-marine-aqua text-marine-navy text-center font-bold uppercase tracking-wider rounded-xl hover:bg-white transition-all shadow-lg shadow-marine-aqua/20"
                  onClick={() => setIsOpen(false)}
                >
                  Get a Quote
                </Link>
                <a
                  href="tel:+919376502550"
                  className="flex items-center justify-center gap-3 text-neutral-graylight hover:text-white transition-colors"
                >
                  <div className="p-2 rounded-full bg-white/10">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">+91 9376502550</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default TubelightNavbar;
