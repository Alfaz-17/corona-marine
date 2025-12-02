import React from 'react';
import { Link } from 'react-router-dom';
import { Anchor, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
<footer className="bg-marine-blue text-neutral-white">
  <div className="container mx-auto px-6 py-12">
     <div className="flex flex-col h-full">
        <div className="flex mx-auto items-center mb-4">
          <Anchor className="w-6 h-6  text-marine-aqua mr-2" />
          <span className="font-bold text-xl">Corona Marine</span>
        </div>
        <p className="text-neutral-graylight text-justify mb-4 flex-1">
          Corona Marine is a leading stockist and supplier of Marine Engine Parts, Auxiliary Machinery, Navigation Equipment, and Industrial Automation. We cater to the global maritime industry, serving ship owners, management companies, and trading houses with high-quality spares sourced from Alang ship breaking yard. We ensure reliability, transparency, and competitive pricing for all our clients.
        </p>
        <div className="flex space-x-4 m-auto">
          <Facebook className="w-5 h-5 text-marine-aqua hover:text-white" />
          <Twitter className="w-5 h-5 text-marine-aqua hover:text-white" />
          <Linkedin className="w-5 h-5 text-marine-aqua hover:text-white" />
          <Instagram className="w-5 h-5 text-marine-aqua hover:text-white" />
        </div>
      </div>
    <div className="grid grid-cols-1 mt-6 md:grid-cols-4 gap-8 items-start">


      {/* Quick Links */}
      <div >
        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li><Link to="/about" className="hover:text-marine-aqua transition">About Us</Link></li>
          <li><Link to="/products" className="hover:text-marine-aqua transition">Products</Link></li>
          <li><Link to="/brands" className="hover:text-marine-aqua transition">Brands</Link></li>
          <li><Link to="/blog" className="hover:text-marine-aqua transition">Blog</Link></li>
          <li><Link to="/contact" className="hover:text-marine-aqua transition">Contact</Link></li>
        </ul>
      </div>

      {/* Services */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Services</h3>
        <ul className="space-y-2 text-neutral-graylight">
          <li>Automation Systems Supply</li>
          <li>Marine Equipment Supply</li>
          <li>Technical Support</li>            
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <MapPin className="w-5 h-5 text-marine-aqua mt-1 mr-3 flex-shrink-0" />
            <span className="text-neutral-graylight">Bhavnagar, Gujarat, India</span>
          </div>
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-marine-aqua mr-3" />
            <span className="text-neutral-graylight">+91 9376502550</span>
          </div>
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-marine-aqua mr-3" />
            <span className="text-neutral-graylight">coronamarine5050@gmail.com</span>
          </div>
        </div>
      </div>
    </div>

    {/* Footer Bottom */}
    <div className="border-t border-marine-navy mt-12 pt-8 text-center">
      <p className="text-neutral-graycool mb-2 text-sm md:text-base">
        © 2024 Corona Marine. All rights reserved. | Privacy Policy | Terms of Service
      </p>
      <p className="text-neutral-graycool text-sm">
        Developed by <a href="https://www.instagram.com/alfaz_bilakhiya17" className="text-marine-aqua hover:underline" target="_blank" rel="noopener noreferrer">@alfaz_bilakhiya17</a>
      </p>
    </div>
  </div>
</footer>


  );
};

export default Footer;
