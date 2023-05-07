import React, {useCallback} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainScreen} from '../screens/MainScreen';
import {MyPageScreen} from '../screens/MyPageScreen';
import CustomIcon from './CustomIcon';

const Tab = createBottomTabNavigator();

export function TabNavigation() {
  const MainIcon = useCallback(
    ({color}: {color: string}) => (
      <CustomIcon name="iconMain" color={color} size={35} />
    ),
    [],
  );

  const UploadIcon = useCallback(
    ({color}: {color: string}) => (
      <CustomIcon name="iconUpload" color={color} size={35} />
    ),
    [],
  );

  const MyPageIcon = useCallback(
    ({color}: {color: string}) => (
      <CustomIcon name="iconMyPage" color={color} size={35} />
    ),
    [],
  );
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Login"
        component={MainScreen}
        options={{
          tabBarIcon: MainIcon,
        }}
      />
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={{
          tabBarIcon: UploadIcon,
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          tabBarIcon: MyPageIcon,
        }}
      />
    </Tab.Navigator>
  );
}
