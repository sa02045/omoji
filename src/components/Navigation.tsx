import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TabNavigation} from './TabNavigation';
import {StackNavigation} from './StackNavigation';
import {loginAtom} from '../atoms/LoginAtom';
import {useRecoilState} from 'recoil';
import EncryptedStorage from 'react-native-encrypted-storage';
import {requestRefresh} from '../api/auth';
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY} from '../api/core';

export function Navigation() {
  const [login, setLogin] = useRecoilState(loginAtom);

  useEffect(() => {
    async function refreshToken() {
      const accessToken = await EncryptedStorage.getItem(ACCESS_TOKEN_KEY);
      const refToken = await EncryptedStorage.getItem(REFRESH_TOKEN_KEY);

      if (accessToken && refToken) {
        try {
          const {refreshToken: newRefreshToken} = await requestRefresh(
            accessToken,
            refToken,
          );

          await EncryptedStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);
          setLogin(true);
        } catch (e) {
          setLogin(false);
        }
      }
    }

    refreshToken();
  }, [setLogin]);

  return (
    <NavigationContainer>
      {login ? <TabNavigation /> : <StackNavigation />}
    </NavigationContainer>
  );
}
