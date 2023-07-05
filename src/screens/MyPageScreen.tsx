import {Text, TouchableOpacity, View, Image, Pressable} from 'react-native';
import React from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FlatList} from 'react-native-gesture-handler';
import {MyPageImageCard} from '../components/MyPageImageCard';
import {useRecoilState} from 'recoil';
import {nicknameSelector} from '../atoms/NickNameAtom';
import {useFetchMyPosts} from '../hook/services/queries/useFetchMyPosts';
import {LoadingIndicator} from '../components/LoadingIndicator';

type StackParamList = {
  MyPost: {id: number};
  Setting: undefined;
  NickName: undefined;
};

export function MyPageScreen() {
  const navigator = useNavigation<StackNavigationProp<StackParamList>>();
  const [nickname] = useRecoilState(nicknameSelector);

  const {data: myPosts, error, refetch, isLoading} = useFetchMyPosts();

  useFocusEffect(() => {
    refetch();
  });

  if (isLoading) {
    return <LoadingIndicator />;
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
