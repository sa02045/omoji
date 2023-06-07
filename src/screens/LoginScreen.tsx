import React from 'react';
import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import EncryptedStorage from 'react-native-encrypted-storage';
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, NICKNAME_KEY} from '../api/core';
import {useRecoilState} from 'recoil';
import {loginAtom} from '../atoms/LoginAtom';

import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import {requestPostAppleLogin} from '../api/auth';

type StackParamList = {
  Login: undefined;
  Preview: undefined;
  NickName: undefined;
};

export function LoginScreen() {
  const [_, setLogin] = useRecoilState(loginAtom);
  const {navigate} = useNavigation<StackNavigationProp<StackParamList>>();

  async function onPressAppleLogin() {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    if (credentialState === appleAuth.State.AUTHORIZED) {
      const {identityToken} = appleAuthRequestResponse;
      if (!identityToken) {
        Alert.alert('로그인 실패', '로그인에 실패했습니다.');
        return;
      }

      try {
        const {accessToken, refreshToken, isNewUser, nickname} =
          await requestPostAppleLogin(identityToken);

        await EncryptedStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        await EncryptedStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

        if (isNewUser) {
          navigate('NickName');
        } else {
          await EncryptedStorage.setItem(NICKNAME_KEY, nickname);
          setLogin(true);
        }
      } catch (e) {
        Alert.alert('로그인 실패', JSON.stringify(e));
      }
    }
  }

  async function onPressNaverLogin() {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    if (credentialState === appleAuth.State.AUTHORIZED) {
      const {identityToken} = appleAuthRequestResponse;
      if (!identityToken) {
        Alert.alert('로그인 실패', '로그인에 실패했습니다.');
        return;
      }

      try {
        const {accessToken, refreshToken, isNewUser, nickname} =
          await requestPostAppleLogin(identityToken);

        await EncryptedStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        await EncryptedStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

        if (isNewUser) {
          navigate('NickName');
        } else {
          await EncryptedStorage.setItem(NICKNAME_KEY, nickname);
          setLogin(true);
        }
      } catch (e) {
        Alert.alert('로그인 실패', JSON.stringify(e));
      }
    }
  }
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigate('Preview');
        }}>
        <Text style={styles.toMainText}>둘러보기</Text>
      </Pressable>
      <View>
        <Text style={styles.text}>오늘 모입지?</Text>
        <Text style={styles.text}>오모지 입니다.</Text>
        <Image
          style={styles.image}
          source={require('../assets/loginImage.png')}
        />
      </View>
      <View style={styles.loginButtonContainer}>
        <Pressable
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            height: 56,
            borderRadius: 10,
            alignSelf: 'flex-end',
            marginBottom: 12,
          }}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: 20,
            }}>
            <Image
              source={require('../assets/Apple.png')}
              style={{width: 36, height: 36}}
            />
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                marginLeft: 56,
              }}
              onPress={onPressAppleLogin}>
              Apple로 시작하기
            </Text>
          </View>
        </Pressable>
        <Pressable style={styles.loginContainer}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: 20,
            }}>
            <Image
              source={require('../assets/Naver.png')}
              style={{width: 36, height: 36}}
            />
            <Text
              style={{
                fontWeight: 'bold',
                color: '#fff',
                textAlign: 'center',
                marginLeft: 56,
              }}
              onPress={onPressNaverLogin}>
              네이버로 시작하기
            </Text>
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
  toMainText: {
    color: '#fff',
    padding: 16,
    alignSelf: 'flex-end',
  },
  naverLoginButton: {
    flexDirection: 'row',
    backgroundColor: '#03C75A',
    height: 56,
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  image: {
    width: 260,
    height: 260,
    alignSelf: 'center',
    marginTop: 76,
  },
  naverLoginText: {
    flex: 1,
    color: '#FFFFFF',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 16,
  },
  appleLogin: {
    width: '100%',
    height: 56,
    marginTop: 10,
    borderRadius: 10,
  },
  loginButtonContainer: {
    marginTop: 50,
  },

  loginContainer: {
    flexDirection: 'row',
    backgroundColor: '#03C75A',
    height: 56,
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
  loginText: {
    flex: 1,
    color: '#FFFFFF',
    textAlign: 'center',
    alignSelf: 'center',
  },
});
