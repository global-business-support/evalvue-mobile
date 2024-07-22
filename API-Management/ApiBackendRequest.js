//payload: res.data.exceptionmessage.config.data  error
//payload: res.data.config.data  notError

import apiClient from "./ApiInterceptor";
export async function ApiLoginRequest(url, request) {
  const responsedata = {
    isexception: false,
    exceptionmessage: "hello",
    data: null,
  };
  try {
    const response = await apiClient.post(url, request);
    responsedata.data = response.data;
  } catch (error) {
    responsedata.isexception = true;
    responsedata.exceptionmessage = error.response.data;
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
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    } else {
      responsedata.isexception = true;
      responsedata.exceptionmessage = error.response.data;
    }
  }
  return responsedata;
}
