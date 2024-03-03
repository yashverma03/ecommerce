import axios from 'axios';

/**
 * Axios instance configured with a base URL and headers for making HTTP requests to products API.
 * @type {AxiosInstance}
 */
const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
