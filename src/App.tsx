import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native';
import {Navigation} from './components/Navigation';
import {RecoilRoot} from 'recoil';
import 'react-native-gesture-handler';

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <SafeAreaView style={styles.container}>
        <Navigation />
      </SafeAreaView>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17171B',
  },
});

export default App;
