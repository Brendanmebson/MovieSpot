import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSearchMovies } from '../hooks/useMovies';
import MovieGrid from '../components/MovieGrid';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [page, setPage] = useState(1);
  const { movies, loading, error, totalPages } = useSearchMovies(query, page);

  useEffect(() => {
    setPage(1);
  }, [query]);

  const loadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Search Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Search Movies
        </h1>
        <div className="max-w-md mx-auto">
          <SearchBar />
        </div>
      </div>

      {/* Search Results */}
      {query && (
        <div className="mb-6">
          <p className="text-dark-400">
            {loading && page === 1 ? (
              'Searching...'
            ) : (
              <>
                {movies.length > 0 
                  ? `Found ${movies.length} result${movies.length !== 1 ? 's' : ''} for "${query}"`
                  : `No results found for "${query}"`
                }
              </>
            )}
          </p>
        </div>
      )}

      {error && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-dark-400">{error}</p>
        </div>
      )}

      {!query && !loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">Start searching</h3>
          <p className="text-dark-400">Enter a movie title to get started</p>
        </div>
      )}

      {query && <MovieGrid movies={movies} loading={loading && page === 1} />}

      {/* Load More Button */}
      {!loading && movies.length > 0 && page < totalPages && (
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadMore}
            className="btn-primary px-8 py-3 text-lg"
          >
            Load More Results
          </motion.button>
        </div>
      )}

      {/* Loading More */}
      {loading && page > 1 && <LoadingSpinner />}
    </motion.div>
  );
};

export default Search;