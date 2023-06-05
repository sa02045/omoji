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

    console.log(response);

    if (response.ok) {
      return (await response.json()) as AppleLoginResponse;
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
