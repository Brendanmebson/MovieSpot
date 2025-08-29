import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Trash2 } from 'lucide-react';
import { useWatchlist } from '../hooks/useWatchlist';
import MovieGrid from '../components/MovieGrid';

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  const clearWatchlist = () => {
    if (window.confirm('Are you sure you want to clear your entire watchlist?')) {
      watchlist.forEach(movie => removeFromWatchlist(movie.id));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-3">
          <Bookmark className="w-8 h-8 text-primary-500" />
          <h1 className="text-3xl md:text-4xl font-bold">My Watchlist</h1>
          <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm">
            {watchlist.length}
          </span>
        </div>

        {watchlist.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearWatchlist}
            className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
            <span>Clear All</span>
          </motion.button>
        )}
      </motion.div>

      {/* Watchlist Content */}
      {watchlist.length === 0 ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold mb-2">Your watchlist is empty</h3>
          <p className="text-dark-400 mb-6">
            Start adding movies to keep track of what you want to watch
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/"
            className="btn-primary inline-block px-6 py-3"
          >
            Browse Movies
          </motion.a>
        </motion.div>
      ) : (
        <>
          <p className="text-dark-400 mb-6">
            Movies you've saved to watch later
          </p>
          <MovieGrid movies={watchlist} loading={false} />
        </>
      )}
    </motion.div>
  );
};

export default Watchlist;