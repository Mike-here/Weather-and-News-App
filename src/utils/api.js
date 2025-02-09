import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'https://api.openweathermap.org/data/2.5';
const API_KEY = process.env.REACT_APP_API_KEY || '2ec3658520171cd1960bc9e518549a6c';

export const fetchWeatherByCoords = async (lat, lon) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric'
    }
  });
  return response.data;
};

export const fetchWeatherData = async (city) => {
  const response = await axios.get(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
  return response.data;
};

export const fetchForecastData = async (lat, lon) => {
  const response = await axios.get(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
  return response.data;
}; 