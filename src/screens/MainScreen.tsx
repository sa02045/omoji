import {
  Button,
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {EvaluateButton} from '../components/EvaluateButton';
import {useCallback, useEffect, useRef, useState} from 'react';
import React from 'react';
import {Lottie} from '../components/Lottie';
import {requestGetMyPosts} from '../api/post';
import {useQuery} from '@tanstack/react-query';
import {requestPostEvaluate} from '../api/post';
import {ImageCard} from '../components/ImageCard';
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const alreadyRemoved: Array<number> = [-1];

export function MainScreen() {
  const [lottieType, setLottieType] = useState<'good' | 'bad' | null>(null);

  const onPressLottie = useCallback(
    async (type: 'good' | 'bad') => {
      setLottieType(type);
      setTimeout(() => {
        setLottieType(null);
      }, 1000);
    },
    [setLottieType],
  );

  const [products, setProducts] = useState<Product[]>([]);
  const [_, setLastDirection] = useState();
  const elementRef = useRef([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // const onLayout = e => {
  //   const {width, height} = e.nativeEvent.layout;
  //   setCardWidth(width);
  //   setCardHeight(height);
  // };

  // const onPress = e => {
  //   const {locationX, locationY} = e.nativeEvent;
  //   if (linearHeight > locationY) {
  //     console.log('detail');
  //   } else {
  //     setCurrentIndex(prev => {
  //       if (cardWidth / 2 < locationX) {
  //         return prev < imgs.length - 1 ? prev + 1 : imgs.length - 1;
  //       } else {
  //         return prev > 0 ? prev - 1 : 0;
  //       }
  //     });
  //   }
  // };

  //

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <ImageCard
          title="title"
          imgs={[
            'https://post-phinf.pstatic.net/MjAxOTA3MThfMjM1/MDAxNTYzMzc4MjkwMzI0.2LosoDxKa0SWBbCpOkjGErXE6OkIBv0Jv67gglWzI9Yg.By-2KfSmjv-opW9hHhYiWLzcSV-S5zxhqpDxEtgeZpUg.JPEG/%EB%82%A8%EC%9E%90%EB%B0%98%EB%B0%94%EC%A7%80_%EC%9E%98_%EC%9E%85%EB%8A%94_%EC%BD%94%EB%94%94_BEST10_%284%29.jpg?type=w1200',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWKJ1_D6svJkDqmPbk1dKZ8EYEGUf_2TH_WA&usqp=CAU',
          ]}
        />
      </View>

      <View style={styles.buttonContainer}>
        <EvaluateButton
          type="hmm"
          onPress={() => {
            onPressLottie('bad');
          }}
        />
        <EvaluateButton
          type="good"
          onPress={() => {
            onPressLottie('good');
          }}
        />
      </View>
      {lottieType && <Lottie type={lottieType} />}
    </View>
  );
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  cardContainer: {
    flex: 1,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: 500,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
});
