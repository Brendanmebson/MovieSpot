import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film, Home, Bookmark, Search } from 'lucide-react';
import SearchBar from './SearchBar';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-dark-800 shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Film className="w-8 h-8 text-primary-500" />
            <span className="text-2xl font-bold text-white">MovieSpot</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'bg-primary-600 text-white' 
                  : 'text-dark-300 hover:text-white hover:bg-dark-700'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            
            <Link
              to="/watchlist"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/watchlist') 
                  ? 'bg-primary-600 text-white' 
                  : 'text-dark-300 hover:text-white hover:bg-dark-700'
              }`}
            >
              <Bookmark className="w-5 h-5" />
              <span className="hidden sm:inline">Watchlist</span>
            </Link>

            {/* Mobile Search Button */}
            <button 
              className="md:hidden p-2 text-dark-300 hover:text-white hover:bg-dark-700 rounded-lg"
              onClick={() => navigate('/search')}
            >
              <Search className="w-5 h-5" />
            </button>
          </nav>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-4">
          <SearchBar />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;