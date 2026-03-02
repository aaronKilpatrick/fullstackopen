import axios from 'axios';

const get = (baseUrl, endpoint, params) => {
  const url = `${baseUrl}${endpoint}`;
  const req = axios.get(url, { params: params }).catch((e) => {
    console.log(`Error requesting form url ${url}:\n${e}`);
    return null;
  });
  return req;
};

export default { get };
