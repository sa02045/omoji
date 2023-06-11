import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useRecoilState} from 'recoil';
import {loginAtom} from '../atoms/LoginAtom';
export function SettingScreen() {
  const [_, setLogin] = useRecoilState(loginAtom);
  return (
    <View style={styles.container}>
      <View>
        <View>
          <View style={styles.row}>
            <Pressable
              onPress={() => {
                EncryptedStorage.removeItem('accessToken');
                EncryptedStorage.removeItem('refreshToken');
                setLogin(false);
              }}>
              <Text style={styles.text}>로그아웃</Text>
            </Pressable>
          </View>
          <View style={styles.row}>
            <Pressable
              onPress={() => {
                EncryptedStorage.removeItem('accessToken');
                EncryptedStorage.removeItem('refreshToken');
                setLogin(false);
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
