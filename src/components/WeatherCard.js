import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  CloudLightning,
  Droplets,
  Wind 
} from 'lucide-react';

const getWeatherIcon = (weatherCode) => {
  switch (true) {
    case weatherCode >= 200 && weatherCode < 300:
      return <CloudLightning size={48} className="text-yellow-400" />;
    case weatherCode >= 300 && weatherCode < 600:
      return <CloudRain size={48} className="text-blue-400" />;
    case weatherCode >= 600 && weatherCode < 700:
      return <CloudSnow size={48} className="text-blue-200" />;
    case weatherCode >= 800:
      return <Cloud size={48} className="text-gray-400" />;
    case weatherCode === 800:
      return <Sun size={48} className="text-yellow-400" />;
    default:
      return <Cloud size={48} className="text-gray-400" />;
  }
};

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-white bg-opacity-90 p-6 rounded-lg shadow-lg"
    >
      <div className="text-center">
        <motion.h2 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-3xl font-bold text-gray-800"
        >
          {weatherData.name}
        </motion.h2>
        
        <motion.div 
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="my-4"
        >
          {getWeatherIcon(weatherData.weather[0].id)}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-6xl font-bold text-weather-primary my-4"
        >
          {Math.round(weatherData.main.temp)}°C
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-600 capitalize"
        >
          {weatherData.weather[0].description}
        </motion.p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 gap-4 mt-6"
      >
        <div className="text-center flex flex-col items-center">
          <Droplets className="text-blue-500 mb-2" />
          <p className="text-gray-600">Humidity</p>
          <p className="text-xl font-semibold">{weatherData.main.humidity}%</p>
        </div>
        <div className="text-center flex flex-col items-center">
          <Wind className="text-gray-500 mb-2" />
          <p className="text-gray-600">Wind Speed</p>
          <p className="text-xl font-semibold">{weatherData.wind.speed} m/s</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WeatherCard; 