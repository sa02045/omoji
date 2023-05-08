import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native';
import {Navigation} from './components/Navigation';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17171B',
  },
});

export default App;
