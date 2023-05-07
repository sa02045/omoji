import axios from 'axios';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';

import {requestRefresh} from './auth';

const BASE_URL = Config.BASE_URL;
export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';
export const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN_KEY';

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  async config => {
    const accessToken = await EncryptedStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const {
      config,
      response: {status},
    } = error;
    if (status === 419) {
      const originalRequest = config;
      const accessToken = await EncryptedStorage.getItem(ACCESS_TOKEN_KEY);
      const refreshToken = await EncryptedStorage.getItem(REFRESH_TOKEN_KEY);
      if (!accessToken || !refreshToken) {
        return Promise.reject(error);
      }
      const {data} = await requestRefresh(accessToken, refreshToken);
      await EncryptedStorage.setItem(ACCESS_TOKEN_KEY, data.data.accessToken);
      originalRequest.headers.authorization = `Bearer ${data.data.accessToken}`;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default instance;
