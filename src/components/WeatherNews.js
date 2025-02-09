import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Newspaper } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchWeatherNews = async () => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        category: 'science',
        q: 'weather',
        apiKey: process.env.REACT_APP_NEWS_API_KEY,
        language: 'en',
        pageSize: 5,
        sortBy: 'publishedAt'
      },
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_NEWS_API_KEY}`
      }
    });
    console.log('News API Response:', response.data); // For debugging
    return response.data.articles;
  } catch (error) {
    console.error('News API Error:', error.response || error);
    return [];
  }
};

const WeatherNews = ({ isDark }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: news, isLoading } = useQuery({
    queryKey: ['weatherNews'],
    queryFn: fetchWeatherNews,
    refetchInterval: 300000, // Refetch every 5 minutes
    staleTime: 300000,
    cacheTime: 3600000,
    onError: (error) => {
      console.error('News fetch error:', error);
    }
  });

  console.log('News data:', news);
  console.log('Is loading:', isLoading);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
          isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
        }`}
      >
        <Newspaper size={20} />
        <span>Weather News</span>
        <ChevronDown size={16} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute left-0 mt-2 w-96 rounded-lg shadow-lg ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Latest Weather News
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`p-1 rounded-full ${
                    isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <X size={16} />
                </button>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {news?.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block p-3 rounded-lg ${
                        isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h4 className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {item.title}
                      </h4>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.description?.slice(0, 100)}...
                      </p>
                    </motion.a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeatherNews; 