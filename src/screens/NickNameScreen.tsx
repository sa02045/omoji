import React, {useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {requestPatchProfile} from '../api/auth';

import {NICKNAME_KEY} from '../api/core';
import EncryptedStorage from 'react-native-encrypted-storage';

type StackParamList = {
  Login: undefined;
  Preview: undefined;
};

export function NickNameScreen() {
  const {navigate} = useNavigation<StackNavigationProp<StackParamList>>();

  const [nickname, setNickname] = useState('');

  async function onPressButton() {
    try {
      await requestPatchProfile(nickname);
      await EncryptedStorage.setItem(NICKNAME_KEY, nickname);
      navigate('Preview');
    } catch (e) {
      Alert.alert('닉네임 설정 실패', JSON.stringify(e));
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>닉네임을 설정해주세요</Text>
      </View>
      <View style={styles.nicknameContainer}>
        <TextInput
          placeholder="닉네임"
          style={styles.input}
          placeholderTextColor="#fff"
          maxLength={9}
          onChangeText={setNickname}
          value={nickname}
        />
      </View>
      <View>
        <Pressable onPress={onPressButton}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>확인</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 35,
    paddingRight: 35,
    backgroundColor: '#17171B',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  nicknameContainer: {
    marginTop: 20,
  },
  input: {
    color: '#fff',
    borderColor: '#fff',
    fontSize: 24,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
});
