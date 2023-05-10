import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TabNavigation} from './TabNavigation';
import {StackNavigation} from './StackNavigation';
import {loginAtom} from '../atoms/LoginAtom';
import {useRecoilState} from 'recoil';

export function Navigation() {
  const [login] = useRecoilState(loginAtom);
  return (
    <NavigationContainer>
      {!login ? <TabNavigation /> : <StackNavigation />}
    </NavigationContainer>
  );
}
