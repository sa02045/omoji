import React, {useCallback} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainScreen} from '../screens/MainScreen';
import CustomIcon from './CustomIcon';
import {MainStack} from './MainStack';
import {MyPageStack} from './MyPageStack';

const Tab = createBottomTabNavigator();

const TabNavigatorStyles = {
  backgroundColor: '#17171B',
};

export function TabNavigation() {
  const MainIcon = useCallback(
    ({color}: {color: string}) => (
      <CustomIcon name="iconMain" color={color} size={36} />
    ),
    [],
  );

  const UploadIcon = useCallback(
    ({color}: {color: string}) => (
      <CustomIcon name="iconUpload" color={color} size={36} />
    ),
    [],
  );

  const MyPageIcon = useCallback(
    ({color}: {color: string}) => (
      <CustomIcon name="iconMyPage" color={color} size={36} />
    ),
    [],
  );
  return (
    <Tab.Navigator
      initialRouteName="Main"
      sceneContainerStyle={TabNavigatorStyles}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          backgroundColor: '#17171B',
          borderTopColor: '#17171B',
        },
        tabBarActiveTintColor: '#fff',
        headerShown: false,
      }}>
      <Tab.Screen
        name="MainStack"
        component={MainStack}
        options={{
          tabBarIcon: MainIcon,
        }}
      />
      <Tab.Screen
        name="Upload"
        component={MainScreen}
        options={{
          tabBarIcon: UploadIcon,
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageStack}
        options={{
          tabBarIcon: MyPageIcon,
          headerTitle: '마이페이지',
        }}
      />
    </Tab.Navigator>
  );
}
