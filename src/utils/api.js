import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherData = async (city) => {
  const response = await axios.get(BASE_URL, {
    params: {
      q: city,
      appid: process.env.REACT_APP_WEATHER_API_KEY,
      units: 'metric'
    }
  });
  return response.data;
}; 