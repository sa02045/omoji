import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Pressable,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {Tag} from '../components/Tag';
import {ScrollView} from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';
import {EvaluateButton} from '../components/EvaluateButton';
import Carousel from 'react-native-reanimated-carousel';
import {Lottie} from '../components/Lottie';

type Params = {
  id: number;
};

export function MainPostScreen() {
  const route = useRoute();
  const {id} = route.params as Params;
  const [commentText, setCommentText] = useState('');
  const [lottieType, setLottieType] = useState<'good' | 'bad' | null>(null);

  const onPressLottie = (type: 'good' | 'bad') => () => {
    setLottieType(type);
    setTimeout(() => {
      setLottieType(null);
    }, 1000);
  };
  const onPressPostComment = () => {};

  return (
    <View style={styles.mainPostContainer}>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.imageContainer}>
          <Carousel
            width={width}
            height={480}
            data={[
              {
                imgUrl:
                  'https://raw.githubusercontent.com/dohooo/react-native-reanimated-carousel/HEAD/assets/home-banner.png',
              },
            ]}
            scrollAnimationDuration={1000}
            onSnapToItem={index => console.log('current index:', index)}
            renderItem={({item}) => (
              <ImageBackground
                source={{uri: item.imgUrl}}
                resizeMode="cover"
                style={{height: 480}}
              />
            )}
          />
          <View style={styles.evaluateButtonContainer}>
            <EvaluateButton type="hmm" onPress={onPressLottie('bad')} />
            <EvaluateButton type="good" onPress={onPressLottie('good')} />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>제목이 한 줄일 경우...</Text>
          </View>

          <View style={styles.tagContainer}>
            <View style={{marginRight: 8}}>
              <Tag text="test" />
            </View>
            <View style={{marginRight: 8}}>
              <Tag text="test" />
            </View>
            <View style={{marginRight: 8}}>
              <Tag text="test" />
            </View>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>
              이번주에 친구들이랑 강릉 여행가는데 어떤 옷을 입을지 고민되네여,,,
              이렇게 입고 가면 추울까요? 1번 룩과 2번 룩 중에 골라주세요. 글자
              수 100자로 제한
            </Text>
          </View>

          <View style={styles.commentContainer}>
            <View style={styles.commentTopContainer}>
              <Text style={styles.CommentTitle}>댓글</Text>
            </View>
            <View style={styles.commentBottomContainer}>
              <View style={styles.commentBottomCommentContainer}>
                <Text style={styles.nickname}>네이버 닉네임</Text>
                <Text style={styles.comment}>
                  ㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹ
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.myCommentContainer}>
        <View>
          <TextInput
            placeholder="댓글 쓰기..."
            placeholderTextColor={'#fff'}
            style={styles.myCommentInput}
            value={commentText}
            onChangeText={text => setCommentText(text)}
          />
        </View>
        <Pressable onPress={onPressPostComment}>
          <Text style={styles.myCommentText}>게시</Text>
        </Pressable>
      </View>
      {lottieType && <Lottie type={lottieType} />}
    </View>
  );
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainPostContainer: {
    flex: 1,
    backgroundColor: '#17171B',
    paddingBottom: 80,
    position: 'relative',
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#17171B',
  },
  bottomContainer: {
    paddingLeft: 35,
    paddingRight: 35,
    marginTop: 32,
  },
  commentContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 32,
  },
  commentTopContainer: {
    marginBottom: 12,
  },
  commentBottomContainer: {},
  commentBottomCommentContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  nickname: {
    color: '#C0C0C0',
    fontSize: 12,
  },
  comment: {
    color: '#fff',
    paddingLeft: 5,
    fontSize: 12,
    flex: 1,
  },
  titleContainer: {},
  title: {
    fontSize: 21,
    color: '#fff',
    fontWeight: '700',
  },
  contentContainer: {
    paddingBottom: 30,
  },
  contentText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#ddd',
  },
  tagContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 32,
    paddingBottom: 32,
  },
  CommentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  myCommentContainer: {
    height: 60,
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
    paddingLeft: 32,
    paddingRight: 32,
  },
  myCommentText: {
    color: '#fff',
    fontSize: 12,
  },
  myCommentInput: {
    color: '#fff',
  },
  goodOrBadContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 32,
  },
  goodOrBadButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    height: 60,
    backgroundColor: '#282828',
    width: (width - 70) / 2,
  },
  goodOrBadImage: {
    width: 32,
    height: 32,
  },
  goodOrBadButtonText: {
    color: '#fff',
    marginLeft: 12,
  },
  imageContainer: {
    position: 'relative',
  },
  evaluateButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    left: width / 4,
  },
});
