import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TabNavigation} from './TabNavigation';
import {StackNavigation} from './StackNavigation';
import {loginAtom} from '../atoms/LoginAtom';
import {useRecoilState} from 'recoil';
import EncryptedStorage from 'react-native-encrypted-storage';
import {requestRefresh} from '../api/auth';
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY} from '../api/core';
import {ActivityIndicator, View} from 'react-native';

export function Navigation() {
  const [login, setLogin] = useRecoilState(loginAtom);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function refreshToken() {
      setIsLoading(true);
      const accessToken = await EncryptedStorage.getItem(ACCESS_TOKEN_KEY);
      const refToken = await EncryptedStorage.getItem(REFRESH_TOKEN_KEY);

      if (!accessToken) {
        setLogin(false);
      }

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
        } finally {
          setIsLoading(false);
        }
      }
    }

    refreshToken();
  }, [setLogin]);

  if (isLoading) {
    return (
      <View
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {login ? <TabNavigation /> : <StackNavigation />}
    </NavigationContainer>
  );
}
