import React, {useLayoutEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainScreen} from '../screens/MainScreen';
import {MainPostScreen} from '../screens/MainPostScreen';
import {useNavigation, useRoute} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export function MainStack() {
  const route = useRoute();
  const navigation = useNavigation();

  useLayoutEffect(() => {}, [route, navigation]);

  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTitle: '오모지',
        headerTitleStyle: {
          color: '#fff',
        },
        headerStyle: {
          backgroundColor: '#17171B',
        },
      }}>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerBackTitle: '',
        }}
      />
      <Stack.Screen
        name="MainPost"
        component={MainPostScreen}
        options={{
          headerTitle: '',
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}
