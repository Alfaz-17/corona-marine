import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Anchor,
  Menu,
  X,
  Phone,
  ChevronDown,
  Home,
  Info,
  ShoppingBag,
  Star,
  BookOpen,
  PhoneCall,
} from "lucide-react";
import api from "../../utils/api";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4 hover:text-marine-aqua" /> },
    { name: "About", path: "/about", icon: <Info className="w-4 h-4 hover:text-marine-aqua" /> },
    { name: "Products", path: "/products", icon: <ShoppingBag className="w-4 h-4 hover:text-marine-aqua" /> },
    { name: "Brands", path: "/brands", icon: <Star className="w-4 h-4 hover:text-marine-aqua" /> },
    { name: "Blog", path: "/blog", icon: <BookOpen className="w-4 h-4 hover:text-marine-aqua" /> },
    { name: "Contact", path: "/contact", icon: <PhoneCall className="w-4 h-4 hover:text-marine-aqua" /> },
  ];

  const isActive = (path) => location.pathname === path;

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-marine-navy via-marine-blue to-marine-navy text-neutral-white shadow-md">
        <div className="navbar max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
          {/* Navbar Start */}
          <div className="navbar-start flex items-center gap-2">
            {/* Sidebar Toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-full bg-marine-aqua text-marine-navy hover:bg-marine-blue hover:text-white transition lg:hidden"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex font-heading items-center gap-2 text-xl font-bold">
              <Anchor className="w-7 h-7 text-marine-aqua animate-pulse" />
              <span>Corona Marine</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-6 items-center relative">
            {navigation.map((item) =>
              item.name === "Products" ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(true)}
                  onMouseLeave={() => setOpenDropdown(false)}
                >
                  <button
                    className={`flex items-center gap-2 px-3 py-2 font-heading rounded-md font-medium transition-all ${
                      isActive(item.path)
                        ? "bg-marine-aqua text-marine-navy shadow"
                        : "hover:bg-marine-blue"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {/* Animated Dropdown */}
                  <AnimatePresence>
                    {openDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-56 rounded-lg bg-white text-marine-navy shadow-lg overflow-hidden"
                      >
                        <ul className="flex flex-col">
                          {categories.map((cat) => (
                            <li key={cat._id}>
                              <Link
                                to={`/products?category=${cat.slug || cat._id}`}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-marine-blue hover:text-white transition"
                              >
                                <ShoppingBag className="w-4 h-4" />
                                {cat.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 font-heading rounded-md font-medium transition-all ${
                    isActive(item.path)
                      ? "bg-marine-aqua text-marine-navy shadow"
                      : "hover:bg-marine-blue"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* Navbar End */}
          <div className="navbar-end flex items-center gap-3">
            <a
              href="tel:+1234567890"
              className="btn bg-marine-aqua hover:bg-marine-blue text-neutral-white hidden sm:flex items-center gap-1 font-medium transition-all"
            >
              <Phone className="w-4 h-4" />
              Call Us Now
            </a>
          </div>
        </div>
      </header>

      {/* SIDEBAR (Mobile Nav) */}
      <motion.aside
        initial={{ x: -260 }}
        animate={{ x: isSidebarOpen ? 0 : -260 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-marine-navy via-marine-blue to-marine-navy text-neutral-white shadow-2xl z-50 flex flex-col lg:hidden"
      >
        {/* Logo (Sidebar) */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-marine-blue">
          <Anchor className="w-7 h-7 text-marine-aqua animate-pulse" />
          <span className="font-heading tracking-wide text-lg">Corona Marine</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="flex flex-col gap-2">
            {navigation.map((item) =>
              item.name === "Products" ? (
                <li key={item.name}>
                  <button
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                    className={`flex items-center justify-between w-full px-4 py-2 rounded-lg font-heading transition-all ${
                      isActive(item.path)
                        ? "bg-marine-aqua text-marine-navy font-semibold shadow"
                        : "hover:bg-marine-blue"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {item.icon}
                      {item.name}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Animated dropdown */}
                  <AnimatePresence>
                    {mobileDropdownOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="pl-6 mt-2 flex flex-col gap-1 overflow-hidden"
                      >
                        {categories.map((cat) => (
                          <li key={cat._id}>
                            <button
                              onClick={() => {
                                navigate(`/products?category=${cat.slug || cat._id}`);
                                setIsSidebarOpen(false);
                                setMobileDropdownOpen(false);
                              }}
                              className="flex items-center gap-2 w-full text-left px-4 py-2 rounded hover:bg-marine-blue transition"
                            >
                              <ShoppingBag className="w-4 h-4" />
                              {cat.name}
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-heading transition-all ${
                      isActive(item.path)
                        ? "bg-marine-aqua text-marine-navy font-semibold shadow"
                        : "hover:bg-marine-blue"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="px-6 py-4 border-t border-marine-blue flex flex-col gap-3">
          <a
            href="tel:+1234567890"
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-marine-aqua text-marine-navy font-semibold hover:bg-marine-blue hover:text-white transition"
          >
            <Phone className="w-4 h-4" />
            Call Us Now
          </a>
        </div>
      </motion.aside>
    </>
  );
};

export default Header;
