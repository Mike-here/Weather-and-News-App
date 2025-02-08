import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ForecastChart = ({ forecastData }) => {
  if (!forecastData) return null;

  // Process the forecast data to show daily temperatures
  const dailyData = forecastData.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    
    if (!acc[day]) {
      acc[day] = {
        day,
        temp: item.main.temp,
        min: item.main.temp_min,
        max: item.main.temp_max,
      };
    }
    return acc;
  }, {});

  const chartData = Object.values(dailyData);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-md bg-white bg-opacity-90 p-6 rounded-lg shadow-lg mt-6"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">7-Day Forecast</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="day"
              stroke="#1f2937"
              tick={{ fill: '#1f2937' }}
            />
            <YAxis
              stroke="#1f2937"
              tick={{ fill: '#1f2937' }}
              label={{ 
                value: 'Temperature (°C)',
                angle: -90,
                position: 'insideLeft',
                fill: '#1f2937'
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#00668A"
              strokeWidth={2}
              dot={{ fill: '#00668A' }}
              name="Temperature"
            />
            <Line
              type="monotone"
              dataKey="max"
              stroke="#dc2626"
              strokeWidth={2}
              dot={{ fill: '#dc2626' }}
              name="Max Temp"
            />
            <Line
              type="monotone"
              dataKey="min"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ fill: '#2563eb' }}
              name="Min Temp"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ForecastChart; 