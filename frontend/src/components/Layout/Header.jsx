import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Anchor, Menu, X, Phone } from 'lucide-react';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Brands', path: '/brands' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
<header className="navbar bg-gradient-to-r from-marine-navy via-marine-dark to-marine-navy text-neutral-white shadow-lg sticky top-0 z-50">
  <div className="navbar-start">
    <Link to="/" className="flex items-center btn btn-ghost normal-case text-xl text-neutral-white">
      <Anchor className="w-7 h-7 text-marine-aqua mr-2 animate-pulse" />
      <span className="font-extrabold tracking-wide text-lg">Corona Marine</span>
    </Link>
  </div>

  {/* Center Menu (Desktop) */}
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 gap-2">
      {navigation.map((item) => (
        <li key={item.name}>
          <Link
            to={item.path}
            className={`relative px-2 py-1 transition-colors duration-300 ${
              isActive(item.path)
                ? 'text-marine-aqua font-semibold after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-marine-aqua'
                : 'text-neutral-graylight hover:text-marine-aqua'
            }`}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>

  <div className="navbar-end flex items-center gap-2">
    {/* Dark Mode Toggle */}
    <button
      onClick={toggleDarkMode}
      className="btn btn-ghost btn-circle text-neutral-white hover:bg-marine-blue transition"
    >
      {darkMode ? '🌙' : '☀️'}
    </button>

    {/* Call Button */}
    <a
      href="tel:+1234567890"
      className="btn bg-marine-aqua hover:bg-marine-blue text-neutral-white hidden sm:flex items-center gap-1 font-medium transition-all"
    >
      <Phone className="w-4 h-4" />
      Call Us Now
    </a>

    {/* Mobile Menu */}
    <div className="dropdown lg:hidden relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="btn btn-ghost btn-circle text-neutral-white hover:bg-marine-blue transition"
      >
        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {isMenuOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="menu menu-sm dropdown-content mt-3 p-3 shadow-lg bg-marine-blue rounded-xl w-56 right-0 text-neutral-white flex flex-col gap-2"
        >
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`px-2 py-1 rounded hover:bg-marine-dark transition ${
                  isActive(item.path) ? 'bg-marine-aqua text-marine-navy font-semibold' : ''
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  </div>
</header>


  );
};

export default Header;