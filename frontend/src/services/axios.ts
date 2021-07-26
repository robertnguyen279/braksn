import axios from 'axios';

// Default config options
const defaultOptions = {
  baseURL: 'https://uryvam47x6.execute-api.ap-southeast-1.amazonaws.com/dev',
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create instance
const instance = axios.create(defaultOptions);

// Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('beehive-auth');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default instance;
