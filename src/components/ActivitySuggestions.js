import React from 'react';
import { motion } from 'framer-motion';
import {
  Bike,
  Umbrella,
  Tent,
  Waves,
  Mountain,
  Wind,
  Snowflake,
  Coffee,
  Book,
  Trees,
  Gamepad2,
  UtensilsCrossed
} from 'lucide-react';

const activities = {
  clear: [
    { icon: Bike, name: 'Cycling', description: 'Perfect weather for a bike ride!' },
    { icon: Mountain, name: 'Hiking', description: 'Great day for a hike!' },
    { icon: Waves, name: 'Swimming', description: 'Take a refreshing swim!' }
  ],
  rain: [
    { icon: Coffee, name: 'Café Visit', description: 'Perfect for a cozy café visit' },
    { icon: Book, name: 'Reading', description: 'Ideal weather to read a book' },
    { icon: Gamepad2, name: 'Indoor Games', description: 'Great time for indoor activities' }
  ],
  snow: [
    { icon: Snowflake, name: 'Skiing', description: 'Hit the slopes!' },
    { icon: UtensilsCrossed, name: 'Cook', description: 'Perfect day for cooking' },
    { icon: Coffee, name: 'Hot Cocoa', description: 'Enjoy a warm drink' }
  ],
  clouds: [
    { icon: Trees, name: 'Park Visit', description: 'Nice weather for a park visit' },
    { icon: Tent, name: 'Camping', description: 'Good conditions for camping' },
    { icon: Bike, name: 'Light Exercise', description: 'Great for outdoor exercise' }
  ],
  windy: [
    { icon: Wind, name: 'Kite Flying', description: 'Perfect for flying kites!' },
    { icon: Umbrella, name: 'Beach Walk', description: 'Enjoy the breeze' },
    { icon: Trees, name: 'Nature Walk', description: 'Feel the fresh air' }
  ]
};

const getActivitiesByWeather = (weatherData) => {
  if (!weatherData) return [];

  const temp = weatherData.main.temp;
  const weatherId = weatherData.weather[0].id;
  const windSpeed = weatherData.wind.speed;

  if (weatherId >= 600 && weatherId < 700) return activities.snow;
  if (weatherId >= 200 && weatherId < 600) return activities.rain;
  if (weatherId === 800 && temp > 20) return activities.clear;
  if (windSpeed > 5) return activities.windy;
  return activities.clouds;
};

const ActivityCard = ({ activity, index }) => {
  const Icon = activity.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md flex items-center space-x-4"
    >
      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
        <Icon className="text-blue-500 dark:text-blue-300" size={24} />
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 dark:text-white">
          {activity.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {activity.description}
        </p>
      </div>
    </motion.div>
  );
};

const ActivitySuggestions = ({ weatherData, isDark }) => {
  if (!weatherData) return null;

  const suggestedActivities = getActivitiesByWeather(weatherData);

  return (
    <>
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      className={`fixed left-4 top-1/2 -translate-y-1/2 w-72 bg-white ${
        isDark ? 'dark:bg-gray-800' : ''
      } bg-opacity-90 p-6 rounded-lg shadow-lg space-y-4 max-h-[80vh] overflow-y-auto hidden lg:block`}
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
        Suggested Activities
      </h2>
      <div className="space-y-3">
        {suggestedActivities.map((activity, index) => (
          <ActivityCard key={index} activity={activity} index={index} />
        ))}
      </div>
    </motion.div>
    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mt-6 lg:hidden"
    >
      <h2 className="text-xl font-bold text-white mb-4">
        Suggested Activities
      </h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-4">
          {suggestedActivities.map((activity, index) => (
            <div key={index} className="min-w-[200px]">
              <ActivityCard activity={activity} index={index} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default ActivitySuggestions; 