import React, {useEffect} from 'react';
import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import NaverLogin from '@react-native-seoul/naver-login';
import Config from 'react-native-config';
import {requestGetNaverLogin} from '../api/auth';
import {loginAtom} from '../atoms/LoginAtom';
import {useRecoilState} from 'recoil';
import {AppleButton} from '@invertase/react-native-apple-authentication';
import {appleAuth} from '@invertase/react-native-apple-authentication';

type StackParamList = {
  Login: undefined;
  Preview: undefined;
};

export function LoginScreen() {
  const consumerKey = Config.NAVER_APP_KEY;
  const consumerSecret = Config.NAVER_APP_SECRET_KEY;
  const appName = Config.APP_NAME;
  const serviceUrlScheme = Config.SERVICE_URL_SCHEME;

  const [_, setLogin] = useRecoilState(loginAtom);

  const {navigate} = useNavigation<StackNavigationProp<StackParamList>>();

  const onPressNaverLogin = async () => {};

  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn(
        'If this function executes, User Credentials have been Revoked',
      );
    });
  }, []);

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
      <View>
        <Pressable style={styles.loginContainer}>
          <Text style={styles.loginText}>토근 제거</Text>
        </Pressable>
        <Pressable style={styles.loginContainer}>
          <Text style={styles.loginText}>로그아웃</Text>
        </Pressable>
        <Pressable style={styles.loginContainer} onPress={onPressNaverLogin}>
          <Text style={styles.loginText}>네이버로 시작하기</Text>
        </Pressable>
        <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
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
  loginContainer: {
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
  loginText: {
    flex: 1,
    color: '#FFFFFF',
    textAlign: 'center',
    alignSelf: 'center',
  },
  appleLogin: {
    width: '100%',
    height: 56,
  },
});
