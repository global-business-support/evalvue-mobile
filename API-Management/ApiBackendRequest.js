import axios from 'axios';
import apiClient from './ApiInterceptor';

export async function ApiAxiosRequest(url, request) {
  const responsedata = {
    isexception: false,
    exceptionmessage: "",
    data: null,
  };
  try {
    const response = await axios.post(url, request);
    responsedata.data = response.data;
  } catch (error) {
    responsedata.isexception = true;
    if (error.response) {
      responsedata.exceptionmessage = error.response.data || error.message;
      if (error.response.status === 401) {
        console.error('Unauthorized access:', error.response.data);
      }
    } else {
      responsedata.exceptionmessage = error.message;
    }
  }
  return responsedata;
}

export default async function ApiBackendRequest(url, request) {
  const responsedata = {
    isexception: false,
    exceptionmessage: "",
    data: null,
  };
  try {
    const response = await apiClient.post(url, request);
    responsedata.data = response.data;
  } catch (error) {
    responsedata.isexception = true;
    responsedata.exceptionmessage = error.response?.data || error.message;

    if (error.response?.status === 401) {
      console.error('Unauthorized access:', error.response.data + "  expired");
    }
  };
  return responsedata;
};
