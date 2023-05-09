import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UploadScreen} from '../screens/UploadScreen';
const Stack = createNativeStackNavigator();

export function UploadStack() {
  return (
    <Stack.Navigator initialRouteName="Upload" screenOptions={{}}>
      <Stack.Screen name="Upload" component={UploadScreen} />
      <Stack.Screen name="UploadImage" component={UploadScreen} />
    </Stack.Navigator>
  );
}
