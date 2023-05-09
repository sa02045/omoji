import {Dimensions, StyleSheet, View} from 'react-native';
import {EvaluateButton} from '../components/EvaluateButton';
import {useState} from 'react';
import React from 'react';
import {Lottie} from '../components/Lottie';

export function MainScreen() {
  const [lottieType, setLottieType] = useState<'good' | 'bad' | null>(null);
  const onPressLottie = (type: 'good' | 'bad') => () => {
    setLottieType(type);
    setTimeout(() => {
      setLottieType(null);
    }, 1000);
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <EvaluateButton type="hmm" onPress={onPressLottie('bad')} />
        <EvaluateButton type="good" onPress={onPressLottie('good')} />
      </View>
      {lottieType && <Lottie type={lottieType} />}
    </View>
  );
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#17171B',
  },
  buttonContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    left: width / 2 - width / 4,
    bottom: 30,
  },
  lottieWrapper: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});
