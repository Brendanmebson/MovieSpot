import { useState, useEffect } from 'react';
import { tmdbApi } from '../services/tmdbApi';

export const useMovieDetail = (movieId) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await tmdbApi.getMovieDetails(movieId);
        setMovie(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  return { movie, loading, error };
};