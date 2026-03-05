import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', variant = 'default', ...props }) => {
  const baseClasses = 'rounded-xl shadow-lg border border-gray-100 backdrop-blur-sm bg-opacity-80 transition-shadow duration-300';
  
  const variants = {
    default: 'bg-white',
    elevated: 'bg-white shadow-xl',
    subtle: 'bg-gray-50 border-gray-200',
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;