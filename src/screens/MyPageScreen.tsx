import {Pressable, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
type StackParamList = {
  MyPost: {id: number};
  Setting: undefined;
};

export function MyPageScreen() {
  const {navigate} = useNavigation<StackNavigationProp<StackParamList>>();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>춤추는</Text>
      </View>
      <View>
        <Text style={styles.subTitle}>춤추는</Text>
      </View>
      <View />
      <Pressable
        onPress={() => {
          navigate('MyPost', {id: 1});
        }}>
        <Text>게시글</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigate('Setting');
        }}>
        <Text>설정</Text>
      </Pressable>
      <View />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#17171B',
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
});
