import React from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';

import LottieView from 'lottie-react-native';

export function Lottie({type}: {type: 'good' | 'bad'}) {
  return (
    <View style={styles.lottieContainer}>
      {type === 'good' ? (
        <LottieView
          source={require('../assets/lottie/good.json')}
          style={styles.lottie}
          autoPlay
          speed={1.5}
          loop={false}
        />
      ) : (
        <LottieView
          source={require('../assets/lottie/bad.json')}
          style={styles.lottie}
          autoPlay
          speed={1.5}
          loop={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  lottieContainer: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  lottie: {
    width: 200,
    height: 200,
  },
});
