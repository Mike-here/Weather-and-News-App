import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import { fetchWeatherData } from './utils/api';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function WeatherApp() {
  const [city, setCity] = React.useState(null);
  
  const { data: weatherData, error, isLoading } = useQuery({
    queryKey: ['weather', city],
    queryFn: () => fetchWeatherData(city),
    enabled: !!city,
  });

  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-white mb-8"
      >
        Weather App
      </motion.h1>
      
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      
      {error && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 bg-white px-4 py-2 rounded mb-4"
        >
          City not found. Please try again.
        </motion.div>
      )}
      
      <WeatherCard weatherData={weatherData} />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherApp />
    </QueryClientProvider>
  );
}

export default App; 