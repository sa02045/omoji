import {Dimensions, StyleSheet, View, Text} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import {LoadingIndicator} from '../components/LoadingIndicator';

import {EvaluateButton} from '../components/EvaluateButton';
import {useCallback, useEffect, useRef, useState} from 'react';
import React from 'react';
import {Lottie} from '../components/Lottie';
import type {Evaluate} from '../api/evaluate';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MySwiper} from '../components/MySwiper';
import {useEvaluate} from '../hook/services/mutations/useEvaluate';

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

type MainStackList = {
  Main: undefined;
  MainPost: {
    id: number;
  };
};

const {width} = Dimensions.get('window');

export function MainScreen() {
  const [lottieType, setLottieType] = useState<'good' | 'bad' | null>(null);
  const {navigate} = useNavigation<StackNavigationProp<MainStackList>>();

  const [cards, setCards] = useState<Evaluate[]>([]);
  const [deletedCards, setDeleteCards] = useState<Evaluate[]>([]);
  const swiperRef = useRef<Swiper<Evaluate>>(null);

  const onPressLottie = useCallback(
    async (type: 'good' | 'bad') => {
      setLottieType(type);
      setTimeout(() => {
        setLottieType(null);
      }, 1000);
    },
    [setLottieType],
  );

  const {
    refetch: refetchEvaluates,
    data: evaluatesData,
    isLoading,
  } = useEvaluate();

  useEffect(() => {
    if (evaluatesData) {
      setCards(evaluatesData);
    }
  }, [evaluatesData]);

  useEffect(() => {
    if (cards.length === 0) {
      refetchEvaluates();
    }
  }, [cards, refetchEvaluates]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      {cards.length ? (
        <MySwiper
          items={cards}
          setCards={setCards}
          ref={swiperRef}
          onSwipedTop={() => {
            onPressLottie('good');
          }}
          onSwipedBottom={() => {
            onPressLottie('bad');
          }}
          navigatePostScreen={(postId: number) => {
            navigate('MainPost', {id: postId});
          }}
          setDeleteCards={setDeleteCards}
          deletedCards={deletedCards}
        />
      ) : (
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <Text style={{color: '#fff'}}>아직 글이 없어요</Text>
        </View>
      )}

      {cards.length ? (
        <View style={styles.buttonContainer}>
          <EvaluateButton
            type="hmm"
            onPress={() => {
              if (swiperRef.current) {
                swiperRef.current.swipeBottom();
              }
            }}
          />
          <EvaluateButton
            type="good"
            onPress={() => {
              if (swiperRef.current) {
                swiperRef.current.swipeTop();
              }
            }}
          />
        </View>
      ) : null}

      {lottieType && <Lottie type={lottieType} />}
    </View>
  );
}

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
  cardContainer: {},
  card: {},
  cardImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
});
