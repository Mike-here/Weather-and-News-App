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

const DailyForecast = ({ forecastData, isDark }) => {
  if (!forecastData) return null;

  const dailyData = forecastData.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    
    if (!acc[day]) {
      acc[day] = {
        day,
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        temp: item.main.temp,
        min: item.main.temp_min,
        max: item.main.temp_max,
        weather: item.weather[0],
        humidity: item.main.humidity,
        windSpeed: item.wind.speed
      };
    }
    return acc;
  }, {});

  const days = Object.values(dailyData);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full max-w-md bg-white ${isDark ? 'dark:bg-gray-800' : ''} bg-opacity-90 p-6 rounded-lg shadow-lg mt-6`}
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">7-Day Forecast</h2>
      <div className="grid gap-4">
        {days.map((day, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-gray-700 shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16">
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">{day.day}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{day.date}</div>
              </div>
              {getWeatherIcon(day.weather.id)}
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-800 dark:text-white">
                {Math.round(day.max)}° / {Math.round(day.min)}°
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {day.weather.description}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DailyForecast; 