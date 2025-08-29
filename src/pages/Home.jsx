import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMovies } from '../hooks/useMovies';
import MovieGrid from '../components/MovieGrid';
import CategoryFilter from '../components/CategoryFilter';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('popular');
  const [page, setPage] = useState(1);
  const { movies, loading, error, totalPages } = useMovies(activeCategory, page);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setPage(1);
  };

  const loadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-dark-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
          Discover Movies
        </h1>
        <p className="text-xl text-dark-400 max-w-2xl mx-auto">
          Explore thousands of movies, create your watchlist, and never miss a great film again.
        </p>
      </motion.div>

      {/* Category Filter */}
      <CategoryFilter 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Movies Grid */}
      <MovieGrid movies={movies} loading={loading && page === 1} />

{/* Load More Button */}
     {!loading && movies.length > 0 && page < totalPages && (
       <div className="text-center mt-12">
         <motion.button
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
           onClick={loadMore}
           className="btn-primary px-8 py-3 text-lg"
         >
           Load More Movies
         </motion.button>
       </div>
     )}

     {/* Loading More */}
     {loading && page > 1 && <LoadingSpinner />}
   </motion.div>
 );
};

export default Home;