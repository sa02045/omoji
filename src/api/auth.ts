import axios from './core';

export const requestGetNaverLogin = async (accessToken: string) => {
  return axios.post(
    '/auth/naver',
    {},
    {
      headers: {
        socialToken: `Bearer ${accessToken}`,
      },
    },
  );
};

export const requestRefresh = async (
  accessToken: string,
  refreshToken: string,
) => {
  return axios.post(
    '/auth/refresh',
    {},
    {
      headers: {
        Access: `Bearer ${accessToken}`,
        Refresh: `Bearer ${refreshToken}`,
      },
    },
  );
};

export const requestPostLogout = async () => {
  return axios.post('/auth/logout');
};
