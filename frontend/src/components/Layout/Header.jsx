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
    <header className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <Anchor className="w-6 h-6 text-blue-600 mr-2" />
          <span className="text-slate-800 font-bold">MarineServ</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`${
                  isActive(item.path)
                    ? 'text-blue-600 font-semibold'
                    : 'text-base-content hover:text-blue-600'
                } transition-colors duration-200`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end">
        <button
          onClick={toggleDarkMode}
          className="btn btn-ghost btn-circle mr-2"
        >
          {darkMode ? '🌙' : '☀️'}
        </button>
        
        <a href="tel:+1234567890" className="btn btn-primary hidden sm:flex">
          <Phone className="w-4 h-4 mr-2" />
          Call Us Now
        </a>

        <div className="dropdown lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="btn btn-ghost btn-circle ml-2"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          {isMenuOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 right-0"
            >
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={isActive(item.path) ? 'text-blue-600 font-semibold' : ''}
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