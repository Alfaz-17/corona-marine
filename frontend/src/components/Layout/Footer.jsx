import React from 'react';
import { Link } from 'react-router-dom';
import { Anchor, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
<footer className="bg-marine-blue text-neutral-white">
  <div className="container mx-auto px-4 py-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      
      {/* Company Info */}
      <div>
        <div className="flex items-center mb-4">
          <Anchor className="w-6 h-6 text-marine-aqua mr-2" />
          <span className="font-sans text-xl font-bold">MarineServ</span>
        </div>
        <p className="font-sans text-neutral-graylight mb-4">
          Your trusted partner for marine services and equipment. Serving the maritime industry with excellence since 1985.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-marine-aqua hover:text-neutral-white transition-colors">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="text-marine-aqua hover:text-neutral-white transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-marine-aqua hover:text-neutral-white transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="text-marine-aqua hover:text-neutral-white transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="font-heading text-lg font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li><Link to="/about" className="text-neutral-graylight hover:text-marine-aqua transition-colors">About Us</Link></li>
          <li><Link to="/products" className="text-neutral-graylight hover:text-marine-aqua transition-colors">Products</Link></li>
          <li><Link to="/brands" className="text-neutral-graylight hover:text-marine-aqua transition-colors">Brands</Link></li>
          <li><Link to="/blog" className="text-neutral-graylight hover:text-marine-aqua transition-colors">Blog</Link></li>
          <li><Link to="/contact" className="text-neutral-graylight hover:text-marine-aqua transition-colors">Contact</Link></li>
        </ul>
      </div>

      {/* Services */}
      <div>
        <h3 className="font-heading text-lg font-semibold mb-4">Services</h3>
        <ul className="space-y-2 text-neutral-graylight">
          <li>Marine Equipment Supply</li>
          <li>Technical Support</li>
          <li>Installation Services</li>
          <li>Maintenance & Repair</li>
          <li>Emergency Support</li>
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h3 className="font-heading text-lg font-semibold mb-4">Contact Info</h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <MapPin className="w-5 h-5 text-marine-aqua mt-1 mr-3 flex-shrink-0" />
            <span className="font-sans text-neutral-graylight">123 Harbor Street, Port City, PC 12345</span>
          </div>
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-marine-aqua mr-3" />
            <span className="font-sans text-neutral-graylight">+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-marine-aqua mr-3" />
            <span className="font-sans text-neutral-graylight">info@marineserv.com</span>
          </div>
        </div>
      </div>
    </div>

    <div className="border-t border-marine-navy mt-8 pt-8 text-center">
      <p className="font-sans text-neutral-graycool">
        © 2024 MarineServ. All rights reserved. | Privacy Policy | Terms of Service
      </p>
    </div>
  </div>
</footer>

  );
};

export default Footer;