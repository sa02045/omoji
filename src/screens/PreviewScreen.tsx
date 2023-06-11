import React, {useState} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {TouchableOpacity, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Preview1 from '../assets/preview1.png';
import Preview2 from '../assets/preview2.png';
import Preview3 from '../assets/preview3.png';
import {StackNavigationProp} from '@react-navigation/stack';
import {useRecoilValue} from 'recoil';
import {loginAtom} from '../atoms/LoginAtom';
type StackParamList = {
  Login: undefined;
  Main: undefined;
};

const {width} = Dimensions.get('window');

export const PreviewScreen = () => {
  const [preview, setPreview] = useState(Preview1);
  const [step, setStep] = useState(0);
  const login = useRecoilValue(loginAtom);

  const {navigate} = useNavigation<StackNavigationProp<StackParamList>>();

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
          } else {
            if (login) {
              navigate('Main');
            } else {
              navigate('Login');
            }
          }
        }}>
        <Image source={preview} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width,
  },
});
