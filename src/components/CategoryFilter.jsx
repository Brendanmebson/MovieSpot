import React from 'react';
import { motion } from 'framer-motion';
import { MOVIE_CATEGORIES } from '../utils/constants';

const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {MOVIE_CATEGORIES.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            activeCategory === category.id
              ? 'bg-primary-600 text-white'
              : 'bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-white'
          }`}
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;