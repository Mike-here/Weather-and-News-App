import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import ForecastChart from './components/ForecastChart';
import LoadingSpinner from './components/LoadingSpinner';
import ThemeToggle from './components/ThemeToggle';
import { fetchWeatherData, fetchForecastData, fetchWeatherByCoords } from './utils/api';

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

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 ${
      isDark ? 'dark bg-gray-900' : 'bg-gradient-to-br from-weather-primary to-weather-secondary'
    }`}>
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      
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
      <ForecastChart forecastData={forecastData} isDark={isDark} />
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