import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native';
import {Navigation} from './components/Navigation';
import {RecoilRoot} from 'recoil';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import 'react-native-gesture-handler';
const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <SafeAreaView style={styles.container}>
          <Navigation />
        </SafeAreaView>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17171B',
  },
});

export default App;
