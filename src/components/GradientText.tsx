import React from 'react';
import {Text} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

export const GradientText = (props: any) => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={['#FB7A50', '#BC4FFF']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text {...props} style={[props.style, {opacity: 0}]} />
      </LinearGradient>
    </MaskedView>
  );
};
