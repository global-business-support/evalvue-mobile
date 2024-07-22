import { NATIVE_API_URL } from '@env';
import axios from 'axios';
import { getStringData } from './mmkv-Storage';
const apiClient = axios.create({
  baseURL: NATIVE_API_URL,
  headers: {
    'Content-Type': 'application/json', 
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getStringData('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
