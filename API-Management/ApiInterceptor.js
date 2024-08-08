import axios from 'axios';
import { getStringData, removeData } from './mmkv-Storage'; // Updated import
import { navigate } from './navigationService';
import { NATIVE_API_URL } from '@env';

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
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      console.log("Access token expired or invalid. Clearing token and redirecting to login...");
       removeData('accessToken');
      navigate("Login"); // Redirect to Login screen

      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
