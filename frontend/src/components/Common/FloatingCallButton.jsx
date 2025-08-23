import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

const FloatingCallButton = () => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <a
        href="tel:+1234567890"
        className="btn btn-circle bg-marine-aqua hover:bg-marine-blue text-neutral-white shadow-lg"
      >
        <Phone className="w-6 h-6" />
      </a>
    </motion.div>
  );
};

export default FloatingCallButton;
