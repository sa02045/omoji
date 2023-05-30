import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {EvaluateButton} from '../components/EvaluateButton';
import {useCallback, useEffect, useRef, useState} from 'react';
import React from 'react';
import {Lottie} from '../components/Lottie';
import TinderCard from 'react-tinder-card';
import axios from 'axios';

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
    (type: 'good' | 'bad') => {
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

  useEffect(() => {
    axios.get('https://dummyjson.com/products').then(res => {
      const getProducts = res.data.products as Product[];
      setProducts(getProducts.slice(0, 5));
    });
  }, []);

  const swiped = (direction: any, idToDelete: any) => {
    console.log('removing: ' + idToDelete + ' to the ' + direction);
    setLastDirection(direction);
    alreadyRemoved.push(idToDelete);
  };

  const outOfFrame = (id: number) => {
    setProducts(prev => {
      return prev.filter(product => product.id !== id);
    });
  };

  const swipe = (dir: string) => {
    const cardsLeft = products.filter(
      person => !alreadyRemoved.includes(person.id),
    );
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].id; // Find the card object to be removed
      const index = products.map(person => person.id).indexOf(toBeRemoved); // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      (elementRef.current[index] as any).swipe(dir); // Swipe the card!
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.cardContainer}>
          {products.map((product, index) => (
            <TinderCard
              ref={ref => {
                (elementRef.current[index] as any) = ref;
              }}
              key={product.id}
              onSwipe={dir => swiped(dir, product.id)}
              onCardLeftScreen={() => outOfFrame(product.id)}>
              <View style={styles.card}>
                <ImageBackground
                  style={styles.cardImage}
                  source={{
                    uri: product.thumbnail,
                  }}>
                  <Text style={{color: '#fff'}}>{product.id}</Text>
                </ImageBackground>
              </View>
            </TinderCard>
          ))}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <EvaluateButton
          type="hmm"
          onPress={() => {
            swipe('left');
            onPressLottie('bad');
          }}
        />
        <EvaluateButton
          type="good"
          onPress={() => {
            swipe('right');
            onPressLottie('good');
          }}
        />
      </View>
      {lottieType && <Lottie type={lottieType} />}
    </View>
  );
}

const {width, height} = Dimensions.get('window');

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
    width: '100%',
    height: height,
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
