import React from 'react';
import {View, ActivityIndicator} from 'react-native';

export function LoadingIndicator() {
  return (
    <View
      style={{
        backgroundColor: '#17171B',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
