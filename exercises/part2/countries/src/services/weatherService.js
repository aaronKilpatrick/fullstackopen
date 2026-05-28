import apiClient from './apiClient';

const apiKey = import.meta.env.VITE_WEATHER_KEY;
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const getWeatherByCity = (city) => {
  const params = {
    q: city,
    appid: apiKey,
    units: 'metric',
  };
  const req = apiClient.get(baseUrl, params);
  return req.then((res) => res.data);
};

export default { getWeatherByCity };
