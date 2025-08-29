import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, BookmarkPlus } from 'lucide-react';
import { useWatchlist } from '../hooks/useWatchlist';

const WatchlistButton = ({ movie }) => {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWatchlist(movie);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className={`p-2 rounded-full shadow-lg transition-colors ${
        inWatchlist 
          ? 'bg-primary-600 text-white' 
          : 'bg-black bg-opacity-50 text-white hover:bg-opacity-70'
      }`}
      title={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
    >
      {inWatchlist ? (
        <BookmarkCheck className="w-4 h-4" />
      ) : (
        <Bookmark className="w-4 h-4" />
      )}
    </motion.button>
  );
};

export default WatchlistButton;