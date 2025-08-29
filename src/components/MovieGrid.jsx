import React from 'react';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {[...Array(20)].map((_, index) => (
          <div key={index} className="card animate-pulse">
            <div className="aspect-[2/3] bg-dark-700 rounded-t-xl"></div>
            <div className="p-4">
              <div className="h-4 bg-dark-700 rounded mb-2"></div>
              <div className="h-3 bg-dark-700 rounded mb-2 w-2/3"></div>
              <div className="h-3 bg-dark-700 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎬</div>
        <h3 className="text-xl font-semibold mb-2">No movies found</h3>
        <p className="text-dark-400">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie, index) => (
        <MovieCard key={movie.id} movie={movie} index={index} />
      ))}
    </div>
  );
};

export default MovieGrid;