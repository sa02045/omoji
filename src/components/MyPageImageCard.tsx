import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import GoodIcon from '../assets/mypage-good.png';
import HmmIcon from '../assets/mypage-hmm.png';

const {width} = Dimensions.get('window');

export const MyPageImageCard = ({
  image,
  likeCount,
  dislikeCount,
}: {
  image: string;
  likeCount: number;
  dislikeCount: number;
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imageBackground} source={{uri: image}}>
        <View style={styles.innerContainer}>
          <Image source={GoodIcon} style={styles.icon} />
          <Text style={styles.text}>{likeCount}</Text>
          <Image source={HmmIcon} style={styles.icon} />
          <Text style={styles.text}>{dislikeCount}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {width: 16, height: 16, marginLeft: 10},
  imageBackground: {
    flex: 1,
    width: width / 2,
    height: 250,
  },
  innerContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    display: 'flex',
    flexDirection: 'row',
  },
  text: {marginLeft: 5, color: '#fff'},
});
