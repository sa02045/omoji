import {
  Dimensions,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';

import {EvaluateButton} from '../components/EvaluateButton';
import {useCallback, useEffect, useRef, useState} from 'react';
import React from 'react';
import {Lottie} from '../components/Lottie';
import {fetchEvaluate} from '../api/evaluate';
import type {Evaluate} from '../api/evaluate';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MySwiper} from '../components/MySwiper';
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

  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    if (cards.length === 0) {
      try {
        setIsLoading(true);
        fetchEvaluatePosts();
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchEvaluatePosts() {
      const posts = await fetchEvaluate();
      setCards(posts);
    }
  }, [cards]);

  if (isLoading) {
    return (
      <View
        style={{
          backgroundColor: '#17171B',
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" />
      </View>
    );
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
