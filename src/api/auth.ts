import axios from './core';

export interface SocialLoginResponse {
  nickname: string;
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
  userId: number;
}

export const requestGetNaverLogin = async (accessToken: string) => {
  try {
    const response = await fetch(
      'https://omoji-server-vo2dfmd2vq-du.a.run.app/api/v1/auth/naver',
      {
        method: 'POST',
        headers: {
          socialToken: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.ok) {
      return (await response.json()) as SocialLoginResponse;
    }

    throw Error('Apple Login Failed');
  } catch (e) {
    throw e;
  }
};

interface RefreshResponse {
  tokenPrefix: 'Bearer';
  nickname: string;
  accessToken: string;
  refreshToken: string;
}

export const requestRefresh = async (
  accessToken: string,
  refreshToken: string,
): Promise<RefreshResponse> => {
  try {
    const response = await fetch(
      'https://omoji-server-vo2dfmd2vq-du.a.run.app/api/v1/auth/refresh',
      {
        method: 'POST',
        headers: {
          Access: `Bearer ${accessToken}`,
          Refresh: `Bearer ${refreshToken}`,
        },
      },
    );

    if (response.ok) {
      return (await response.json()) as RefreshResponse;
    }
    throw await response.json();
  } catch (e) {
    throw e;
  }
};

export const requestPostLogout = async () => {
  return axios.post('/auth/logout');
};

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
      return (await response.json()) as SocialLoginResponse;
    }

    throw Error('Apple Login Failed');
  } catch (e) {
    throw e;
  }
};

export async function requestPatchProfile(nickname: string) {
  return axios.patch('/profile', {
    nickname,
  });
}

export async function requestGetProfile() {
  return axios.get('/profile');
}
