import {View} from 'react-native';

import React from 'react';
import {EvaluateButton} from '../components/EvaluateButton';
export function MainScreen() {
  return (
    <View>
      <View>
        <EvaluateButton type="good" onPress={() => {}} />
        <EvaluateButton type="hmm" onPress={() => {}} />
      </View>
    </View>
  );
}
