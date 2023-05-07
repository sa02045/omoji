import * as React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import GoodImage from '../assets/good.png';
import HmmImage from '../assets/hmm.png';

export function EvaluateButton({
  type,
  onPress,
}: {
  type: 'good' | 'hmm';
  onPress: () => void;
}) {
  const image = type === 'good' ? GoodImage : HmmImage;

  return (
    <View style={styles.evaluateButton} onTouchEnd={onPress}>
      <Image source={image} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  evaluateButton: {
    borderRadius: 100,
    padding: 18,
    width: 72,
    height: 72,
    backgroundColor: '#17171B',
    opacity: 0.85,
    marginRight: 10,
    marginLeft: 10,
  },
  image: {
    width: 36,
    height: 36,
  },
});
