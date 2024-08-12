import axios from 'axios';
import { navigate } from './navigationService';
import { NATIVE_API_URL } from '@env';
import { isTokenExpired } from './tokenUtils';
import { removeData, getStringData } from './mmkv-Storage';

const apiClient = axios.create({
  baseURL: NATIVE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (isTokenExpired()) {
      removeData('accessToken');
      navigate('Login');
      return Promise.reject(new Error('Token expired'));
    }
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
      removeData('accessToken');
      navigate('Login');

      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
