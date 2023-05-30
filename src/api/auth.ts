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

export interface AppleLoginResponse {
  nickname: string;
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
  userId: number;
}

export const requestPostAppleLogin = async (socialToken: string) => {
  try {
    const response = await fetch(
      'https://omoji-server-vo2dfmd2vq-du.a.run.app/api/v1/auth/apple',
      {
        method: 'POST',
        headers: {
          socialToken: `Bearer ${socialToken}`,
        },
      },
    );

    if (response.ok) {
      console.log(response);
      return;
    }
    throw Error('Apple Login Failed');
  } catch (e) {
    throw e;
  }
};
