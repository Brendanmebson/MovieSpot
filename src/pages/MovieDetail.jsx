import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Calendar, Clock, Globe, Play, Users } from 'lucide-react';
import { useMovieDetail } from '../hooks/useMovieDetail';
import { TMDB_IMAGE_BASE_URL, IMAGE_SIZES } from '../utils/constants';
import WatchlistButton from '../components/WatchlistButton';
import LoadingSpinner from '../components/LoadingSpinner';
import MovieGrid from '../components/MovieGrid';
import MovieCard from '../components/MovieCard'; // ✅ added import for MovieCard

const MovieDetail = () => {
  const { id } = useParams();
  const { movie, loading, error } = useMovieDetail(id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !movie) {
    return <Navigate to="/" replace />;
  }

  const backdropUrl = movie.backdrop_path
    ? `${TMDB_IMAGE_BASE_URL}${IMAGE_SIZES.backdrop}${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE_URL}${IMAGE_SIZES.poster}${movie.poster_path}`
    : '/placeholder-movie.jpg';

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'TBA';

  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : 'N/A';

  const trailer = movie.videos?.results?.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <div className="relative">
        {/* Background */}
        {backdropUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backdropUrl})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-70" />
          </div>
        )}

        {/* Content */}
        <div className="relative container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0"
            >
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-full md:w-80 rounded-xl shadow-2xl"
              />
            </motion.div>

            {/* Movie Info */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <h1 className="text-3xl md:text-5xl font-bold mb-2">
                  {movie.title}
                </h1>
                <WatchlistButton movie={movie} />
              </div>
            
              {movie.tagline && (
                <p className="text-xl text-primary-400 italic mb-4">
                  "{movie.tagline}"
                </p>
              )}

              {/* Movie Stats */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold">
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="text-dark-400">
                    ({movie.vote_count} votes)
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-dark-400" />
                  <span>{releaseYear}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-dark-400" />
                  <span>{runtime}</span>
                </div>

                {movie.original_language && (
                  <div className="flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-dark-400" />
                    <span className="uppercase">
                      {movie.original_language}
                    </span>
                  </div>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-dark-700 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              {movie.overview && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Overview</h3>
                  <p className="text-dark-300 leading-relaxed">
                    {movie.overview}
                  </p>
                </div>
              )}

              {/* Trailer Button */}
              {trailer && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 btn-primary text-lg px-6 py-3"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Trailer</span>
                </motion.a>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cast */}
          {movie.credits?.cast && movie.credits.cast.length > 0 && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Users className="w-6 h-6 mr-2" />
                Cast
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {movie.credits.cast.slice(0, 6).map((actor) => (
                  <div key={actor.id} className="card p-4 text-center">
                    {actor.profile_path && (
                      <img
                        src={`${TMDB_IMAGE_BASE_URL}${IMAGE_SIZES.profile}${actor.profile_path}`}
                        alt={actor.name}
                        className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
                      />
                    )}
                    <h4 className="font-semibold text-sm mb-1">
                      {actor.name}
                    </h4>
                    <p className="text-xs text-dark-400">
                      {actor.character}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Movie Details */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Details</h3>
            <div className="card p-6 space-y-4">
              {movie.budget > 0 && (
                <div>
                  <span className="font-semibold">Budget:</span>
                  <span className="ml-2 text-dark-300">
                    ${movie.budget.toLocaleString()}
                  </span>
                </div>
              )}
              
              {movie.revenue > 0 && (
                <div>
                  <span className="font-semibold">Revenue:</span>
                  <span className="ml-2 text-dark-300">
                    ${movie.revenue.toLocaleString()}
                  </span>
                </div>
              )}

              {movie.production_companies?.length > 0 && (
                <div>
                  <span className="font-semibold">Production:</span>
                  <div className="mt-2">
                    {movie.production_companies.slice(0, 3).map((company) => (
                      <span
                        key={company.id}
                        className="inline-block bg-dark-700 px-2 py-1 rounded text-sm mr-2 mb-2"
                      >
                        {company.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {movie.homepage && (
                <div>
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-400 hover:text-primary-300 underline"
                  >
                    Official Website
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Similar Movies */}
        {movie.similar?.results && movie.similar.results.length > 0 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-semibold mb-6">Similar Movies</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {movie.similar.results.slice(0, 12).map((similarMovie, index) => (
                <MovieCard key={similarMovie.id} movie={similarMovie} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MovieDetail;
