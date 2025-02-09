import React from 'react';
import { motion } from 'framer-motion';

const Footer = ({ isDark }) => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full text-center py-4 mt-8 ${
        isDark ? 'text-gray-400' : 'text-white'
      }`}
    >
      <p className="text-sm">
        © 2025 Michael Acheampong. All rights reserved.
      </p>
    </motion.footer>
  );
};

export default Footer; 