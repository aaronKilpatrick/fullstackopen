import apiClient from './apiClient';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';

const getAll = () => {
  const req = apiClient.get(baseUrl);
  return req.then((res) => res.data);
};

export default { getAll };
