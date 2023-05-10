import React, {useCallback, useLayoutEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UploadScreen} from '../screens/UploadScreen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

type StackParamList = {
  MainStack: undefined;
};

const Stack = createNativeStackNavigator();

export function UploadStack() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const route = useRoute();
  const headerLeft = useCallback(
    () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MainStack');
        }}>
        <Text style={{color: '#fff'}}>Left</Text>
      </TouchableOpacity>
    ),
    [],
  );

  const headerRight = useCallback(
    () => (
      <TouchableOpacity>
        <Text style={styles.completeButton}>완료</Text>
      </TouchableOpacity>
    ),
    [],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerStyle: {
        backgroundColor: '#17171B',
      },
      headerLeft: headerLeft,
      headerRight: headerRight,
    });
  }, [navigation, headerRight, headerLeft, route]);

  return (
    <Stack.Navigator initialRouteName="Upload">
      <Stack.Screen
        name="Upload"
        component={UploadScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="UploadImage" component={UploadScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  completeButton: {
    color: '#AF68FF',
  },
});
