import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Pressable,
  Button,
} from 'react-native';
import {EvaluateButton} from '../components/EvaluateButton';
import {useCallback, useRef, useState} from 'react';
import React from 'react';
import {Lottie} from '../components/Lottie';
import {useQuery} from '@tanstack/react-query';
import {ImageCard} from '../components/ImageCard';
import {fetchEvaluate, postEvaluate} from '../api/evaluate';
import Swiper from 'react-native-deck-swiper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
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

const {width, height} = Dimensions.get('window');

export function MainScreen() {
  const [lottieType, setLottieType] = useState<'good' | 'bad' | null>(null);
  const {navigate} = useNavigation<StackNavigationProp<MainStackList>>();
  const ref = useRef<any>(null);
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
    data: evaluatePosts,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['evaluatePosts'],
    queryFn: async () => {
      const posts = await fetchEvaluate();
      return posts;
    },
  });

  if (isLoading) {
    return <Text>로딩중</Text>;
  }

  if (error) {
    return <Text>에러</Text>;
  }

  return (
    <View style={styles.container}>
      {evaluatePosts?.length ? (
        <Swiper
          cards={evaluatePosts || []}
          cardStyle={{width: width, height: '100%'}}
          marginTop={0}
          marginBottom={0}
          cardVerticalMargin={0}
          cardHorizontalMargin={0}
          containerStyle={{
            backgroundColor: 'transparent',
          }}
          // onSwipedTop={cardIndex => {
          //   evaluatePosts.find((item, index) => {
          //     if (index === cardIndex) {
          //       const postId = Number(item.id);
          //       onPressLottie('good');
          //     }
          //   });
          // }}
          // onSwipedBottom={cardIndex => {
          //   evaluatePosts.find((item, index) => {
          //     if (index === cardIndex) {
          //       // const postId = Number(item.id);
          //       onPressLottie('bad');
          //     }
          //   });
          // }}
          // onTapCard={cardIndex => {
          //   console.log(cardIndex);
          // }}
          renderCard={item => {
            return (
              <Pressable
                onPress={() => {
                  console.log('hello');
                }}
                style={{
                  width: '100%',
                  height: '100%',
                }}>
                <ImageCard
                  title={item?.title || ''}
                  imgs={item?.imgs || []}
                  goPostScreen={() => {
                    navigate('MainPost', {
                      id: Number(item.id),
                    });
                  }}
                  postId={Number(item.id)}
                />
              </Pressable>
            );
          }}
        />
      ) : (
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <View>
            <Text style={{color: '#fff'}}>아직 글이 없어요.</Text>
          </View>
          <Pressable
            onPress={() => {
              refetch();
            }}>
            <Button title="글 불러오기" color={'#fff'} />
          </Pressable>
        </View>
      )}

      {evaluatePosts?.length ? (
        <View style={styles.buttonContainer}>
          <EvaluateButton
            type="hmm"
            onPress={() => {
              if (ref.current) {
                onPressLottie('bad');
                ref.current.swipeBottom();
              }
            }}
          />
          <EvaluateButton
            type="good"
            onPress={() => {
              onPressLottie('good');
              ref.current.swipeTop();
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
