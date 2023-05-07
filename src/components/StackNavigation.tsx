import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PreviewScreen} from '../screens/PreviewScreen';
import {LoginScreen} from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Preview" component={PreviewScreen} />
    </Stack.Navigator>
  );
}
