import React from 'react';

import {SafeAreaView} from 'react-native';
import {RecoilRoot} from 'recoil';
import {Navigation} from './components/Navigation';

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <SafeAreaView>
        <Navigation />
      </SafeAreaView>
    </RecoilRoot>
  );
}

export default App;
