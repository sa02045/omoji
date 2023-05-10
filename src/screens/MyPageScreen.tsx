import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FlatList} from 'react-native-gesture-handler';
import {MyPageImageCard} from '../components/MyPageImageCard';

type StackParamList = {
  MyPost: {id: number};
  Setting: undefined;
};

export function MyPageScreen() {
  const navigator = useNavigation<StackNavigationProp<StackParamList>>();

  return (
    <View style={styles.myPageScreenContainer}>
      <View style={styles.topContainer}>
        <View>
          <Text style={styles.title}>춤추는</Text>
        </View>
        <View>
          <Text style={styles.subTitle}>춤추는</Text>
        </View>
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={[
          {
            imgUrl:
              'https://raw.githubusercontent.com/dohooo/react-native-reanimated-carousel/HEAD/assets/home-banner.png',
          },
          {
            imgUrl:
              'https://raw.githubusercontent.com/dohooo/react-native-reanimated-carousel/HEAD/assets/home-banner.png',
          },
          {
            imgUrl:
              'https://raw.githubusercontent.com/dohooo/react-native-reanimated-carousel/HEAD/assets/home-banner.png',
          },
          {
            imgUrl:
              'https://raw.githubusercontent.com/dohooo/react-native-reanimated-carousel/HEAD/assets/home-banner.png',
          },
          {
            imgUrl:
              'https://raw.githubusercontent.com/dohooo/react-native-reanimated-carousel/HEAD/assets/home-banner.png',
          },
          {
            imgUrl:
              'https://raw.githubusercontent.com/dohooo/react-native-reanimated-carousel/HEAD/assets/home-banner.png',
          },
        ]}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigator.navigate('MyPost', {id: 1});
            }}>
            <View style={styles.imageWrapper}>
              <MyPageImageCard
                image={item.imgUrl}
                likeCount={1000}
                dislikeCount={1000}
              />
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
        windowSize={6}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  myPageScreenContainer: {
    backgroundColor: '#17171B',
    flex: 1,
  },
  topContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    paddingBottom: 16,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subTitle: {
    fontSize: 14,
    color: '#858585',
  },
  imageWrapper: {},
});
