import React, {useCallback, useLayoutEffect, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {requestPatchProfile} from '../api/auth';

import StorageKey from '../constants/StorageKey';
import EncryptedStorage from 'react-native-encrypted-storage';
import CustomIcon from '../components/CustomIcon';
import {useRecoilState} from 'recoil';
import {nicknameSelector} from '../atoms/NickNameAtom';

export function MyPageNickNameScreen() {
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState('');
  const [nickname, setNickname] = useRecoilState(nicknameSelector);

  const HeaderLeft = useCallback(() => {
    return (
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}>
        <CustomIcon name="iconArrowLeft" color="#fff" size={24} />
      </Pressable>
    );
  }, [navigation]);

  const HeaderRight = useCallback(() => {
    async function onPressButton() {
      try {
        if (nickname.length < 3) {
          Alert.alert('닉네임은 두글자 이상으로 해주세요!');
        }
        await requestPatchProfile(nickname);
        await EncryptedStorage.setItem(StorageKey.NICKNAME_KEY, nickname);
        navigation.goBack();
        setNickname(inputValue);
        setInputValue('');
      } catch (e) {
        Alert.alert('닉네임 설정 실패', JSON.stringify(e));
      }
    }

    return (
      <Pressable style={{padding: 12}} onPress={onPressButton}>
        <Text style={{color: nickname ? '#AF68FF' : '#fff'}}>완료</Text>
      </Pressable>
    );
  }, [nickname, navigation, setNickname, setInputValue, inputValue]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerStyle: {
        backgroundColor: '#17171B',
        shadowColor: '#17171B',
      },
      headerTitleStyle: {
        color: '#fff',
      },
      headerLeft: HeaderLeft,
      headerRight: HeaderRight,
    });
  }, [HeaderLeft, HeaderRight, navigation]);

  return (
    <View style={styles.container}>
      <View style={{marginTop: 16}}>
        <Text style={styles.text}>닉네임</Text>
      </View>
      <View style={styles.nicknameContainer}>
        <TextInput
          placeholder="닉네임 수정"
          style={styles.input}
          placeholderTextColor="#fff"
          maxLength={9}
          onChangeText={setInputValue}
          value={inputValue}
        />
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
    fontWeight: 'bold',
  },
  nicknameContainer: {
    marginTop: 20,
  },
  input: {
    color: '#fff',
    borderColor: '#fff',
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: '#282828',
    padding: 12,
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
