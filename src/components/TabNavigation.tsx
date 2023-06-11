import React, {useCallback} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomIcon from './CustomIcon';
import {MyPageStack} from './MyPageStack';
import {UploadScreen} from '../screens/UploadScreen';
import {useNavigation} from '@react-navigation/native';
import {MainPostScreen} from '../screens/MainPostScreen';
import {MainScreen} from '../screens/MainScreen';
import {TouchableOpacity} from 'react-native';
const Tab = createBottomTabNavigator();

const TabNavigatorStyles = {
  backgroundColor: '#17171B',
};

export function TabNavigation() {
  const navigation = useNavigation();

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

  const headerLeft = useCallback(
    () => (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{marginLeft: 10}}>
        <CustomIcon name="iconArrowLeft" color="#fff" size={24} />
      </TouchableOpacity>
    ),
    [navigation],
  );

  return (
    <Tab.Navigator
      id="TabNavigator"
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
        name="Main"
        component={MainScreen}
        options={() => ({
          headerShown: true,
          headerTitle: '오모지',
          headerTitleStyle: {
            color: '#fff',
          },
          headerStyle: {
            backgroundColor: '#17171B',
          },
          tabBarIcon: MainIcon,
        })}
      />
      <Tab.Screen
        name="MainPost"
        component={MainPostScreen}
        options={{
          tabBarButton: () => null,
          tabBarStyle: {
            display: 'none',
          },
          headerShown: true,
          headerTitle: '',
          headerTitleStyle: {
            color: '#fff',
          },
          headerStyle: {
            backgroundColor: '#17171B',
          },
          headerLeft: headerLeft,
        }}
      />
      <Tab.Screen
        name="UploadStack"
        component={UploadScreen}
        options={{
          tabBarIcon: UploadIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyPageStack"
        component={MyPageStack}
        options={{
          tabBarIcon: MyPageIcon,
          headerTitle: '마이페이지',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
