import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Search, ChevronRight, Home, ShoppingBag, Star, BookOpen, PhoneCall, Info } from "lucide-react";
import api from "../../utils/api";
import { TubelightNavbar } from "../ui/TubelightNavbar";

const Header = () => {
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
      if (window.scrollY > 100) {
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

  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Products", url: "/products", icon: ShoppingBag },
    { name: "Brands", url: "/brands", icon: Star },
    { name: "About", url: "/about", icon: Info },
    { name: "Blog", url: "/blog", icon: BookOpen },
    { name: "Contact", url: "/contact", icon: PhoneCall },
  ];

  return (
    <>
      {/* Logo - Fixed Top Left */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-3 group"
      >
        <img
          src="/assets/logo.svg"
          alt="Corona Marine"
          className="h-10 w-10 drop-shadow-2xl transition-transform group-hover:scale-110 group-hover:rotate-12"
        />
        <div className="flex flex-col">
          <span className="font-heading text-xl font-bold text-white tracking-wide leading-none drop-shadow-lg">
            CORONA
          </span>
          <span className="font-sans text-[10px] text-marine-aqua tracking-[0.3em] uppercase font-semibold drop-shadow-md">
            MARINE
          </span>
        </div>
      </Link>

      {/* Tubelight Navbar - Desktop & Mobile */}
      <TubelightNavbar items={navItems} />

      {/* Mobile Menu Button - Fixed Top Right */}
      <button
        className="lg:hidden fixed top-6 right-6 z-50 p-3 bg-marine-navy/90 backdrop-blur-lg rounded-full border border-marine-aqua/30 text-white hover:text-marine-aqua transition-colors shadow-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Sidebar */}
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
              className="fixed inset-y-0 right-0 w-full sm:w-96 bg-gradient-to-b from-marine-navy via-marine-navy to-marine-blue shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="relative p-6 border-b border-white/10 bg-marine-navy/50 backdrop-blur-sm">
                <div className="flex justify-between items-center">
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
              </div>

              {/* Navigation */}
              <div className="flex-1 overflow-y-auto py-6 px-4">
                <nav className="space-y-2">
                  {navItems.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {link.name === "Products" ? (
                        <div>
                          <button
                            onClick={() =>
                              setActiveDropdown(activeDropdown === link.name ? null : link.name)
                            }
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left font-bold text-white hover:bg-white/10 transition-all ${
                              location.pathname === link.url ? "bg-marine-aqua/20 text-marine-aqua" : ""
                            }`}
                          >
                            <span className="uppercase tracking-wide">{link.name}</span>
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
                                className="overflow-hidden"
                              >
                                <div className="pl-4 pt-2 space-y-1">
                                  {categories.map((category) => (
                                    <Link
                                      key={category._id}
                                      to={`/products?category=${category.slug || category._id}`}
                                      className="block px-4 py-2 text-neutral-graycool hover:text-marine-aqua text-sm font-medium rounded-lg hover:bg-white/5 transition-all"
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
                          to={link.url}
                          className={`block px-4 py-3 rounded-lg font-bold text-white hover:bg-white/10 transition-all uppercase tracking-wide ${
                            location.pathname === link.url ? "bg-marine-aqua/20 text-marine-aqua" : ""
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {link.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Footer CTA */}
              <div className="p-6 bg-marine-blue/30 border-t border-white/10 backdrop-blur-sm space-y-4">
                <Link
                  to="/contact"
                  className="block w-full py-3 bg-marine-aqua text-marine-navy text-center font-bold uppercase tracking-wider rounded-lg hover:bg-white transition-all shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Get a Quote
                </Link>
                <a
                  href="tel:+1234567890"
                  className="flex items-center justify-center gap-3 text-neutral-graylight hover:text-white transition-colors"
                >
                  <div className="p-2 rounded-full bg-white/10">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">+1 (555) 123-4567</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
