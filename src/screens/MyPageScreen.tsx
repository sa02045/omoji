import {Text, TouchableOpacity, View, Image, Pressable} from 'react-native';
import React from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FlatList} from 'react-native-gesture-handler';
import {MyPageImageCard} from '../components/MyPageImageCard';
import {fetchMyPosts} from '../api/post';
import {useQuery} from '@tanstack/react-query';
import {useRecoilState} from 'recoil';
import {nicknameSelector} from '../atoms/NickNameAtom';

type StackParamList = {
  MyPost: {id: number};
  Setting: undefined;
  NickName: undefined;
};

export function MyPageScreen() {
  const navigator = useNavigation<StackNavigationProp<StackParamList>>();
  const [nickname] = useRecoilState(nicknameSelector);

  const {
    data: myPosts,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['myPosts'],
    queryFn: async () => {
      const posts = await fetchMyPosts();
      return posts;
    },
    refetchOnWindowFocus: true,
  });

  useFocusEffect(() => {
    refetch();
  });

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

  if (error) {
    return (
      <View style={styles.myPageScreenContainer}>
        <Text>Error</Text>
      </View>
    );
  }

  return (
    <View style={styles.myPageScreenContainer}>
      <View style={styles.topContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 24, fontWeight: 'bold', color: '#fff'}}>
            {nickname}
          </Text>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Pressable
              onPress={() => {
                navigator.navigate('Setting');
              }}>
              <Image
                source={require('../assets/Setting.png')}
                style={{width: 36, height: 36}}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                navigator.navigate('NickName');
              }}>
              <Image
                source={require('../assets/Edit.png')}
                style={{width: 36, height: 36}}
              />
            </Pressable>
          </View>
        </View>
        <View>
          <Text style={styles.subTitle}>게시물 {myPosts?.length}</Text>
        </View>
      </View>
      {myPosts && (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={myPosts}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigator.navigate('MyPost', {id: Number(item.id)});
              }}>
              <View>
                <MyPageImageCard
                  image={item.imgs[0]}
                  likeCount={item.likeCount}
                  dislikeCount={item.dislikeCount}
                />
              </View>
            </TouchableOpacity>
          )}
          numColumns={2}
        />
      )}
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
    display: 'flex',
  },
  subTitle: {
    fontSize: 14,
    color: '#858585',
  },
});
