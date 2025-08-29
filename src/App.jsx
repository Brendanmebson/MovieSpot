import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-900">
        <Header />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/" 
              element={
                <motion.div
                  key="home"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Home />
                </motion.div>
              } 
            />
            <Route 
              path="/movie/:id" 
              element={
                <motion.div
                  key="movie-detail"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <MovieDetail />
                </motion.div>
              } 
            />
            <Route 
              path="/search" 
              element={
                <motion.div
                  key="search"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Search />
                </motion.div>
              } 
            />
            <Route 
              path="/watchlist" 
              element={
                <motion.div
                  key="watchlist"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Watchlist />
                </motion.div>
              } 
            />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;