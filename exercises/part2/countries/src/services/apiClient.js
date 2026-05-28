import axios from 'axios';

const get = (url, params = {}) => {
  return axios.get(url, { params: params });
};

export default { get };
