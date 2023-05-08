import {View, Text} from 'react-native';
import React from 'react';
import {useRoute, RouteProp} from '@react-navigation/native';

type Params = {
  id: number;
};

export function MyPostScreen() {
  const {params} = useRoute<RouteProp<Record<string, Params>, string>>();

  return (
    <View>
      <View style={{paddingTop: 16, paddingLeft: 20, paddingBottom: 18}} />
      <View>
        <Text>{params.id}</Text>
      </View>
      <View style={{paddingBottom: 200}} />
    </View>
  );
}
