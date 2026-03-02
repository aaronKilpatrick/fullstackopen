import apiClient from './apiClient';

const baseUrl = 'https://www.themealdb.com/api/json/v1/1/';

const search = (keyword) => {
  const endpoint = 'search.php';
  const req = apiClient.get(baseUrl, endpoint, { s: keyword });
  return req.then((res) => res.data);
};

export default { search };
