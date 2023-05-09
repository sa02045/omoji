import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TabNavigation} from './TabNavigation';
import {StackNavigation} from './StackNavigation';
import {loginAtom} from '../atoms/LoginAtom';
import {useRecoilState} from 'recoil';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
export function Navigation() {
  const [login] = useRecoilState(loginAtom);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!login ? (
          <Stack.Group>
            <Stack.Screen name="Tab" component={TabNavigation} />
          </Stack.Group>
        ) : (
          <Stack.Screen name="Stack" component={StackNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
