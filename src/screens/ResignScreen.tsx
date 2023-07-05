import React from 'react';
import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import ResignIcon from '../assets/resign.png';
import {loginAtom} from '../atoms/LoginAtom';
import {useRecoilState} from 'recoil';
import {requestPostResign} from '../api/auth';
import storage from '../utils/Storage';
import STORAGE_KEY from '../constants/StorageKey';

export function ResignScreen() {
  const [_, setLogin] = useRecoilState(loginAtom);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>아쉽네요...</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 8,
            alignItems: 'center',
          }}>
          <Text style={styles.text}>언젠든지</Text>
          <Text style={styles.omojiColor}>오모지</Text>
          <Text style={styles.text}>를 찾아주세요</Text>
        </View>
      </View>
      <View style={{marginTop: 45}}>
        <Image source={ResignIcon} style={{width: 200, height: 200}} />
      </View>

      <View
        style={{width: '100%', padding: 12, position: 'absolute', bottom: 20}}>
        <Pressable
          style={{
            backgroundColor: '#AF68FF',
            height: 56,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
          }}
          onPress={async () => {
            try {
              await requestPostResign();
              setLogin(false);
              storage.removeItem(STORAGE_KEY.ACCESS_TOKEN_KEY);
              storage.removeItem(STORAGE_KEY.REFRESH_TOKEN_KEY);
            } catch (e) {
              Alert.alert('에러가 발생했습니다.', JSON.stringify(e));
            }
          }}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>탈퇴완료</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#17171B',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  omojiColor: {
    fontSize: 24,
    color: '#BC4FFF',
    fontWeight: 'bold',
  },
});
