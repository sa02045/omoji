import React from 'react';
import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import {requestPostAppleLogin} from '../api/auth';

type StackParamList = {
  Login: undefined;
  Preview: undefined;
};

export function LoginScreen() {
  const {navigate} = useNavigation<StackNavigationProp<StackParamList>>();
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
        <AppleButton
          buttonStyle={AppleButton.Style.DEFAULT}
          buttonType={AppleButton.Type.SIGN_IN}
          style={styles.appleLogin}
          onPress={() => onPressAppleLogin()}
        />
      </View>
    </View>
  );
}

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
      console.log(identityToken);
      await requestPostAppleLogin(identityToken);
      Alert.alert('로그인 성공', '로그인에 성공했습니다.');
    } catch (e) {
      console.log(e);
      Alert.alert('로그인 실패', JSON.stringify(e));
    }
  }
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
});
