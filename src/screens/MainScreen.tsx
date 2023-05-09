import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import {EvaluateButton} from '../components/EvaluateButton';
export function MainScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <EvaluateButton type="hmm" onPress={() => {}} />
        <EvaluateButton type="good" onPress={() => {}} />
      </View>
    </View>
  );
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  buttonContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    left: width / 2 - width / 4,
    bottom: 30,
  },
});
