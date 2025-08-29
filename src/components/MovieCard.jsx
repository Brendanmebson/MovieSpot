import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Calendar, Eye } from 'lucide-react';
import { TMDB_IMAGE_BASE_URL, IMAGE_SIZES } from '../utils/constants';
import WatchlistButton from './WatchlistButton';

const MovieCard = ({ movie, index = 0 }) => {
  const posterUrl = movie.poster_path 
    ? `${TMDB_IMAGE_BASE_URL}${IMAGE_SIZES.poster}${movie.poster_path}`
    : '/placeholder-movie.jpg';

  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear()
    : 'TBA';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="card group cursor-pointer relative"
    >
      <Link to={`/movie/${movie.id}`} className="block">
        {/* Poster */}
        <div className="relative overflow-hidden rounded-t-xl aspect-[2/3]">
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
            <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Rating Badge */}
          {movie.vote_average > 0 && (
            <div className="absolute top-2 left-2 bg-black bg-opacity-80 rounded-full px-2 py-1 flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs font-medium">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Movie Info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-dark-400 mb-3">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{releaseYear}</span>
            </div>
            {movie.vote_count > 0 && (
              <span>{movie.vote_count} votes</span>
            )}
          </div>

          {movie.overview && (
            <p className="text-sm text-dark-300 line-clamp-3 mb-3">
              {movie.overview}
            </p>
          )}
        </div>
      </Link>

      {/* Watchlist Button */}
      <div className="absolute top-2 right-2">
        <WatchlistButton movie={movie} />
      </div>
    </motion.div>
  );
};

export default MovieCard;