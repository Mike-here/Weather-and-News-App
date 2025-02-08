import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning } from 'lucide-react';

const getWeatherIcon = (weatherCode) => {
  switch (true) {
    case weatherCode >= 200 && weatherCode < 300:
      return <CloudLightning size={24} className="text-yellow-400" />;
    case weatherCode >= 300 && weatherCode < 600:
      return <CloudRain size={24} className="text-blue-400" />;
    case weatherCode >= 600 && weatherCode < 700:
      return <CloudSnow size={24} className="text-blue-200" />;
    case weatherCode >= 800:
      return <Cloud size={24} className="text-gray-400" />;
    case weatherCode === 800:
      return <Sun size={24} className="text-yellow-400" />;
    default:
      return <Cloud size={24} className="text-gray-400" />;
  }
};

const HourlyForecast = ({ forecastData, isDark }) => {
  if (!forecastData) return null;

  const hourlyData = forecastData.list.slice(0, 24).map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric' }),
    temp: Math.round(item.main.temp),
    weather: item.weather[0],
    humidity: item.main.humidity,
    windSpeed: item.wind.speed
  }));

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`w-full max-w-md bg-white ${isDark ? 'dark:bg-gray-800' : ''} bg-opacity-90 p-6 rounded-lg shadow-lg mt-6`}
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Hourly Forecast</h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-4">
          {hourlyData.map((hour, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center min-w-[80px] p-3 rounded-lg bg-white dark:bg-gray-700 shadow-sm"
            >
              <span className="text-sm text-gray-600 dark:text-gray-300">{hour.time}</span>
              {getWeatherIcon(hour.weather.id)}
              <span className="text-lg font-semibold text-gray-800 dark:text-white mt-1">
                {hour.temp}°C
              </span>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {hour.humidity}%
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HourlyForecast; 