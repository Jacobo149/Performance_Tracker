import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',  // API server URL
});

export default axiosInstance;
