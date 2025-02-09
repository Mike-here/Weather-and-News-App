import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import ThemeToggle from './components/ThemeToggle';
import WeatherNews from './components/WeatherNews';
import { fetchWeatherData, fetchForecastData, fetchWeatherByCoords } from './utils/api';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import WeatherDetails from './components/WeatherDetails';
import Footer from './components/Footer';

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
  const [coords, setCoords] = React.useState(null);
  const [isDark, setIsDark] = React.useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Get user's location on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  // Handle dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // Query for location-based weather
  const locationWeather = useQuery({
    queryKey: ['weather', 'location', coords?.lat, coords?.lon],
    queryFn: () => fetchWeatherByCoords(coords.lat, coords.lon),
    enabled: !!coords && !city,
  });

  // Query for city-based weather
  const cityWeather = useQuery({
    queryKey: ['weather', city],
    queryFn: () => fetchWeatherData(city),
    enabled: !!city,
  });

  // Get the active weather data
  const weatherData = city ? cityWeather.data : locationWeather.data;
  const isLoading = city ? cityWeather.isLoading : locationWeather.isLoading;
  const error = city ? cityWeather.error : locationWeather.error;

  // Forecast query
  const { data: forecastData } = useQuery({
    queryKey: ['forecast', weatherData?.coord?.lat, weatherData?.coord?.lon],
    queryFn: () => fetchForecastData(weatherData.coord.lat, weatherData.coord.lon),
    enabled: !!weatherData?.coord,
  });

  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-between p-4 transition-colors duration-300 ${
      isDark ? 'dark bg-gray-900' : 'bg-gradient-to-br from-weather-primary to-weather-secondary'
    }`}>
      <div className="w-full flex-grow flex flex-col items-center">
        <div className="w-full flex justify-end items-center space-x-4 mb-8">
          <WeatherNews isDark={isDark} />
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </div>
        
        {!isOnline && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-16 left-4 right-4 mx-auto max-w-sm bg-yellow-500 text-white px-4 py-2 rounded-md text-center"
          >
            You are offline. Some features may be limited.
          </motion.div>
        )}
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-8"
        >
          Weather App
        </motion.h1>
        
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        
        {isLoading && (
          <div className="my-8">
            <LoadingSpinner />
          </div>
        )}
        
        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 bg-white dark:bg-gray-800 px-4 py-2 rounded mb-4"
          >
            City not found. Please try again.
          </motion.div>
        )}
        
        <WeatherCard weatherData={weatherData} isDark={isDark} />
        <WeatherDetails weatherData={weatherData} isDark={isDark} />
        <HourlyForecast forecastData={forecastData} isDark={isDark} />
        <DailyForecast forecastData={forecastData} isDark={isDark} />
      </div>
      <Footer isDark={isDark} />
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