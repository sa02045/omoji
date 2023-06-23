import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Dimensions,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';
import CustomIcon from '../components/CustomIcon';
import {requestPostPosts} from '../api/post';
import {StackNavigationProp} from '@react-navigation/stack';
import {Tag} from '../components/Tag';
export interface Asset {
  base64?: string;
  uri?: string;
  width?: number;
  height?: number;
  fileSize?: number;
  type?: string;
  fileName?: string;
  duration?: number;
  bitrate?: number;
  timestamp?: string;
  id?: string;
}
const TITLE_MAX_LENGTH = 38;
const DESCRIPTion_MAX_LENGTH = 100;
const {width} = Dimensions.get('window');

const EVENTS = ['결혼식', '여행', '휴가', '데이트', '학교', '출근', '데일리'];

type StackParamList = {
  Main: undefined;
  MyPageStack: undefined;
};

export function UploadScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [allEvents, setAllEvents] = useState<string[]>([]);
  const [images, setImages] = useState<Asset[]>([]);
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const [isLoading, setIsLoading] = useState(false);

  const isValid =
    title.length > 0 && description.length > 0 && images.length > 0;

  const HeaderLeft = useCallback(() => {
    return (
      <Pressable
        style={{padding: 12}}
        onPress={() => {
          navigation.goBack();
        }}>
        <CustomIcon name="iconArrowLeft" color="#fff" size={24} />
      </Pressable>
    );
  }, [navigation]);

  const HeaderRight = useCallback(() => {
    async function fetchUploadPost() {
      const postData = new FormData();
      postData.append('title', title);
      postData.append('description', description);
      postData.append('events', allEvents);

      images.forEach(image => {
        postData.append('imgs', {
          name: image.fileName,
          type: image.type,
          uri: image.uri?.replace('file://', ''),
        });
      });
      try {
        setIsLoading(true);
        await requestPostPosts(postData);
        setImages([]);
        setTitle('');
        setDescription('');
        setAllEvents([]);
      } catch (e) {
        Alert.alert('에러가 발생했습니다.', JSON.stringify(e));
      } finally {
        navigation.navigate('MyPageStack');
        setIsLoading(false);
      }
    }

    return (
      <Pressable
        onPress={async () => {
          if (!title.length) {
            Alert.alert('제목을 입력해주세요.');
            return;
          }
          if (!images.length) {
            Alert.alert('이미지를 업로드해주세요.');
            return;
          }
          await fetchUploadPost();
        }}>
        <Text style={{color: isValid ? '#AF68FF' : '#fff', marginRight: 16}}>
          완료
        </Text>
      </Pressable>
    );
  }, [isValid, navigation, title, description, images, allEvents]);

  const toggleEvent = (event: string) => {
    setAllEvents(prev => {
      if (prev.includes(event)) {
        return prev.filter(_event => _event !== event);
      }
      return [...prev, event];
    });
  };

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
  }, [HeaderRight, HeaderLeft, navigation]);

  if (isLoading) {
    return (
      <View
        style={{
          backgroundColor: '#17171B',
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{display: 'flex', flexDirection: 'row', marginBottom: 18}}>
        <Pressable
          onPress={async () => {
            const {assets} = await launchImageLibrary({
              mediaType: 'photo',
              quality: 0.8,
              maxWidth: 768,
              selectionLimit: 5,
            });
            if (assets) {
              setImages(assets);
            }
          }}>
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: 8,
              backgroundColor: '#282828',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#fff'}}>업로드</Text>
          </View>
        </Pressable>
        <FlatList
          data={images}
          keyExtractor={(item, index) => item?.uri || index.toString()}
          renderItem={({item, index}) => (
            <View style={{marginLeft: 8}}>
              <Image
                source={{
                  uri: item.uri,
                }}
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 8,
                }}
              />
              <Pressable
                onPress={() => {
                  setImages(images.filter((_, i) => i !== index));
                }}
                style={{
                  position: 'absolute',
                  right: 5,
                  top: 5,
                  backgroundColor: '#000',
                  width: 22,
                  height: 22,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                }}>
                <CustomIcon name="iconClose" color={'#FFFFFF'} />
              </Pressable>
            </View>
          )}
          horizontal={true}
        />
      </View>

      <View style={[styles.formLayout]}>
        <Text style={styles.formTitle}>제목 *</Text>
        <View style={styles.formInputArea}>
          <TextInput
            editable
            multiline
            numberOfLines={1}
            maxLength={TITLE_MAX_LENGTH}
            placeholder="제목을 입력해주세요."
            placeholderTextColor="#8F8F8F"
            style={styles.input}
            onChange={e => {
              setTitle(e.nativeEvent.text);
            }}
            value={title}
          />
          <View style={styles.formTextCountContainer}>
            <Text style={[styles.formTextCount, {color: '#FFFFFF'}]}>
              {title.length}
            </Text>
            <Text style={styles.formTextCount}>/{TITLE_MAX_LENGTH}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.formLayout]}>
        <Text style={styles.formTitle}>내용</Text>
        <View style={styles.formInputArea}>
          <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={DESCRIPTion_MAX_LENGTH}
            placeholder="예시) 주말에 제주도 여행가는데 1번과 2번 중에 어떤 스타일이 더 좋을까요?"
            placeholderTextColor="#8F8F8F"
            style={styles.input}
            onChange={e => {
              setDescription(e.nativeEvent.text);
            }}
            value={description}
          />
          <View style={styles.formTextCountContainer}>
            <Text style={[styles.formTextCount, {color: '#FFFFFF'}]}>
              {description.length}
            </Text>
            <Text style={styles.formTextCount}>/{DESCRIPTion_MAX_LENGTH}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.formLayout]}>
        <Text style={styles.formTitle}>상황</Text>
        <View style={styles.uploadTagContainer}>
          {EVENTS.slice(0, 4).map((event, idx) => (
            <View key={idx} style={styles.tagWrapper}>
              <Tag
                text={event}
                handleClick={() => {
                  toggleEvent(event);
                }}
              />
            </View>
          ))}
        </View>
        <View style={{...styles.uploadTagContainer, marginTop: 8}}>
          {EVENTS.slice(4).map((event, idx) => (
            <View key={idx} style={styles.tagWrapper}>
              <Tag
                text={event}
                handleClick={() => {
                  toggleEvent(event);
                }}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#17171B',
    flex: 1,
    padding: 16,
  },
  formLayout: {
    marginBottom: 36,
  },
  formTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 16,
    fontWeight: '700',
  },
  formInputArea: {
    backgroundColor: '#282828',
    borderRadius: 8,
    padding: 12,
  },
  input: {
    padding: 0,
    color: '#FFFFFF',
  },
  formTextCountContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  formTextCount: {
    alignSelf: 'flex-end',
    color: '#8F8F8F',
    fontSize: 12,
  },

  uploadTagContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: width - 16,
    flexWrap: 'wrap',
  },
  openText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
  tagWrapper: {
    marginRight: 8,
  },
});
