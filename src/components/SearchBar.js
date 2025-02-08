import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit} 
      className="w-full max-w-md mb-8"
    >
      <div className="relative flex items-center">
        <input
          className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-300"
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className={`absolute right-2 p-2 rounded-md transition-all duration-300 ${
            isLoading ? 'opacity-50' : 'hover:bg-white hover:bg-opacity-20'
          }`}
          type="submit"
          disabled={isLoading}
        >
          <Search className="text-white" size={20} />
        </button>
      </div>
    </motion.form>
  );
};

export default SearchBar; 