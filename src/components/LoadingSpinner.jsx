import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex justify-center items-center py-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`border-4 border-dark-700 border-t-primary-500 rounded-full ${sizeClasses[size]}`}
      />
    </div>
  );
};

export default LoadingSpinner;