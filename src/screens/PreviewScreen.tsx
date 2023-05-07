import React, {useState} from 'react';
import {Image, View} from 'react-native';
import {Dimensions, TouchableOpacity} from 'react-native';

import Preview1 from '../assets/preview1.png';
import Preview2 from '../assets/preview2.png';
import Preview3 from '../assets/preview3.png';

const {width} = Dimensions.get('window');

export const PreviewScreen = () => {
  const [preview, setPreview] = useState(Preview1);
  const [step, setStep] = useState(0);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (step === 0) {
            setPreview(Preview2);
            setStep(1);
          } else if (step === 1) {
            setPreview(Preview3);
            setStep(2);
          }
        }}>
        <Image source={preview} style={{height: '100%', width}} />
      </TouchableOpacity>
    </View>
  );
};
