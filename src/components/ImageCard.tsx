import * as React from 'react';
import {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {LayoutChangeEvent, GestureResponderEvent} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  title: string;
  imgs: string[];
}
export function ImageCard({title, imgs}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);
  const slides = new Array(5).fill(0);
  const linearHeight = cardHeight / 3.3;

  const onLayout = (e: LayoutChangeEvent) => {
    const {width, height} = e.nativeEvent.layout;
    setCardWidth(width);
    setCardHeight(height);
  };

  const onPress = (e: GestureResponderEvent) => {
    const {locationX, locationY} = e.nativeEvent;
    if (linearHeight > locationY) {
    } else {
      setCurrentIndex(prev => {
        if (cardWidth / 2 < locationX) {
          return prev < imgs.length - 1 ? prev + 1 : imgs.length - 1;
        } else {
          return prev > 0 ? prev - 1 : 0;
        }
      });
    }
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      <Pressable style={styles.pressableContainer} onPress={onPress}>
        <Image
          style={{width: 358, height: 638, borderRadius: 10}}
          source={{
            uri: imgs?.[currentIndex],
          }}
        />
        <LinearGradient
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}
          locations={[0.5, 1]}
          colors={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0)']}
          style={[styles.linearGradientLayer, {height: linearHeight}]}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              flexDirection: 'column',
              width: '100%',
              padding: 20,
              borderRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                borderRadius: 10,
              }}>
              {slides.map((item, i) => (
                <View
                  key={i}
                  style={[
                    styles.slide,
                    {
                      backgroundColor:
                        currentIndex === i ? '#FFFFFF' : '#8F8F8F',
                      opacity: imgs.length <= i ? 0 : 1,
                    },
                  ]}
                />
              ))}
            </View>
            <Text
              style={{
                fontSize: 21,
                fontWeight: '700',
                marginTop: 32,
                borderRadius: 10,
              }}>
              {title}
            </Text>
          </View>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    borderRadius: 10,
  },
  pressableContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  linearGradientLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100$%',
    borderRadius: 10,
  },
  slide: {
    width: '18%',
    height: 4,
    borderRadius: 20,
  },
});
