import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MyPageScreen} from '../screens/MyPageScreen';
import {SettingScreen} from '../screens/SettingScreen';
import {PostScreen} from '../screens/PostScreen';
import {MyPageNickNameScreen} from '../screens/MyPageNickNameScreen';
import {ResignScreen} from '../screens/ResignScreen';

const Stack = createNativeStackNavigator();

export function MyPageStack() {
  return (
    <Stack.Navigator
      initialRouteName="MyPage"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#17171B',
        },
        headerTitle: '마이 페이지',
        headerTintColor: '#fff',
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="MyPage" component={MyPageScreen} />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{headerTitle: '설정'}}
      />
      <Stack.Screen
        name="MyPost"
        component={PostScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen name="NickName" component={MyPageNickNameScreen} />
      <Stack.Screen
        name="Resign"
        component={ResignScreen}
        options={{headerTitle: '탈퇴하기'}}
      />
    </Stack.Navigator>
  );
}
