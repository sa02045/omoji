import React from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import storage from '../utils/Storage';
import {useRecoilState} from 'recoil';
import {loginAtom} from '../atoms/LoginAtom';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import STORAGE_KEY from '../constants/StorageKey';

type StackParamList = {
  Resign: undefined;
};

export function SettingScreen() {
  const [_, setLogin] = useRecoilState(loginAtom);
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  return (
    <View style={styles.container}>
      <View>
        <View>
          <View style={styles.row}>
            <Pressable
              onPress={() => {
                Alert.alert('로그아웃', '로그아웃하시겠어요?', [
                  {
                    text: '취소',
                    style: 'cancel',
                  },
                  {
                    text: '로그아웃',
                    onPress: () => {
                      storage.removeItem(STORAGE_KEY.ACCESS_TOKEN_KEY);
                      storage.removeItem(STORAGE_KEY.REFRESH_TOKEN_KEY);
                      setLogin(false);
                    },
                  },
                ]);
              }}>
              <Text style={styles.text}>로그아웃</Text>
            </Pressable>
          </View>
          <View style={styles.row}>
            <Pressable
              onPress={() => {
                Alert.alert('회원탈퇴', '정말 탈퇴하시겠어요?', [
                  {
                    text: '취소',
                    style: 'cancel',
                  },
                  {
                    text: '회원탈퇴',
                    onPress: () => {
                      navigation.navigate('Resign');
                    },
                  },
                ]);
              }}>
              <Text style={styles.text}>탈퇴하기</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#17171B',
    flex: 1,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: '#555555',
    borderBottomWidth: 0.25,
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
});
