import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

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
      <View>
        <Pressable style={styles.loginContainer}>
          <Text style={styles.loginText}>토근 제거</Text>
        </Pressable>
        <Pressable style={styles.loginContainer}>
          <Text style={styles.loginText}>로그아웃</Text>
        </Pressable>
        <Pressable style={styles.loginContainer}>
          <Text style={styles.loginText}>네이버로 시작하기</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.signUpText}>네이버로 회원가입</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 35,
    paddingRight: 35,
    paddingBottom: 31,
    backgroundColor: '#17171B',
  },
  toMainText: {
    color: '#FFFFFF',
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
  signUpText: {
    opacity: 0,
    color: '#03C75A',
    margin: 16,
    alignSelf: 'flex-end',
  },
});
