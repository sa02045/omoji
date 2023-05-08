import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PreviewScreen} from '../screens/PreviewScreen';
import {MainScreen} from '../screens/MainScreen';

const Stack = createNativeStackNavigator();

export function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{}}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen
        name="Preview"
        component={PreviewScreen}
        options={{
          headerTitle: '회원가입',
        }}
      />
    </Stack.Navigator>
  );
}
