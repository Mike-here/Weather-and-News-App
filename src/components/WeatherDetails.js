import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Droplets, Sun, Thermometer } from 'lucide-react';

const DetailCard = ({ icon: Icon, title, value, unit }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex flex-col items-center min-w-[150px] p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
  >
    <Icon className="text-weather-primary dark:text-blue-400 mb-2" size={24} />
    <h3 className="text-sm text-gray-600 dark:text-gray-300">{title}</h3>
    <p className="text-lg font-semibold text-gray-800 dark:text-white">
      {value}{unit}
    </p>
  </motion.div>
);

const WeatherDetails = ({ weatherData, isDark }) => {
  if (!weatherData) return null;

  const details = [
    {
      icon: Wind,
      title: 'Wind Speed',
      value: weatherData.wind.speed,
      unit: ' m/s'
    },
    {
      icon: Droplets,
      title: 'Humidity',
      value: weatherData.main.humidity,
      unit: '%'
    },
    {
      icon: Thermometer,
      title: 'Feels Like',
      value: Math.round(weatherData.main.feels_like),
      unit: '°C'
    },
    {
      icon: Sun,
      title: 'Pressure',
      value: weatherData.main.pressure,
      unit: ' hPa'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mt-6 overflow-x-auto"
    >
      <div className="flex space-x-4 pb-4">
        {details.map((detail, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <DetailCard {...detail} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WeatherDetails; 