import React from 'react';
import {StackNavigation} from './StackNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {TabNavigation} from './TabNavigation';

import {View, Text} from 'react-native';

export function Navigation() {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
}
