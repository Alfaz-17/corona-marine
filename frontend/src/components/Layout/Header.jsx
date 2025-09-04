import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Anchor, Menu, X, Phone } from "lucide-react";

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Brands", path: "/brands" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div>
      {/* HEADER */}
      <header className="navbar bg-gradient-to-r from-marine-navy via-marine-blue to-marine-navy text-neutral-white shadow-lg sticky top-0 z-40">
        <div className="navbar-start flex items-center gap-2">
          {/* Sidebar Toggle (Mobile Only) */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full bg-marine-aqua text-marine-navy hover:bg-marine-blue hover:text-white transition lg:hidden"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="flex font-heading items-center btn btn-ghost normal-case text-xl text-neutral-white"
          >
            <Anchor className="w-7 h-7 text-marine-aqua mr-2 animate-pulse" />
            <span className=" font-heading font-extrabold tracking-wide text-lg">Corona Marine</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`px-3 py-2 font-heading rounded-md font-medium transition-all ${
                isActive(item.path)
                  ? "bg-marine-aqua text-marine-navy shadow"
                  : "hover:bg-marine-blue"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="navbar-end flex items-center gap-3">
          
    

          {/* Call Button */}
          <a
            href="tel:+1234567890"
            className="btn bg-marine-aqua hover:bg-marine-blue text-neutral-white hidden sm:flex items-center gap-1 font-medium transition-all"
          >
            <Phone className="w-4 h-4" />
            Call Us Now
          </a>
        </div>
      </header>

      {/* SIDEBAR (Mobile Nav) */}
      <motion.aside
        initial={{ x: -260 }}
        animate={{ x: isSidebarOpen ? 0 : -260 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-marine-navy via-marine-blue to-marine-navy text-neutral-white shadow-2xl z-50 flex flex-col lg:hidden"
      >
        {/* Logo (Sidebar version) */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-marine-blue">
          <Anchor className="w-7 h-7 text-marine-aqua animate-pulse" />
          <span className="font-heading tracking-wide text-lg">Corona Marine</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <ul className="flex flex-col gap-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`block px-4 font-heading py-2 rounded-lg transition-all ${
                    isActive(item.path)
                      ? "bg-marine-aqua text-marine-navy font-semibold shadow"
                      : "hover:bg-marine-blue"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
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
    </div>
  );
};

export default Header;
