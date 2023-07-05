import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TabNavigation} from './TabNavigation';
import {StackNavigation} from './StackNavigation';
import {loginAtom} from '../atoms/LoginAtom';
import {useRecoilState} from 'recoil';
import storage from '../utils/Storage';
import {requestRefresh} from '../api/auth';
import STORAGE_KEY from '../constants/StorageKey';
import {ActivityIndicator, View} from 'react-native';

export function Navigation() {
  const [login, setLogin] = useRecoilState(loginAtom);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function refreshToken() {
      setIsLoading(true);
      const accessToken = await storage.getItem(STORAGE_KEY.ACCESS_TOKEN_KEY);
      const refToken = await storage.getItem(STORAGE_KEY.REFRESH_TOKEN_KEY);

      if (!accessToken) {
        setLogin(false);
        setIsLoading(false);
      }

      if (accessToken && refToken) {
        try {
          const {refreshToken: newRefreshToken} = await requestRefresh(
            accessToken,
            refToken,
          );

          await storage.setItem(STORAGE_KEY.REFRESH_TOKEN_KEY, newRefreshToken);
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
