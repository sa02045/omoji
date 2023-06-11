import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Pressable,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {Tag} from '../components/Tag';
import BadImage from '../assets/hmm.png';
import GoodImage from '../assets/good.png';
import {ScrollView} from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import {useQuery} from '@tanstack/react-query';
import {fetchMyPostById, postCommentById} from '../api/post';

type Params = {
  id: number;
};

export function MyPostScreen() {
  const route = useRoute();
  const {id} = route.params as Params;
  const [commentText, setCommentText] = useState('');

  const {data: myPost, isLoading} = useQuery({
    queryKey: ['myPost', id],
    queryFn: async () => {
      const post = await fetchMyPostById(id);
      return post;
    },
  });

  const onPressPostComment = async () => {
    try {
      await postCommentById(id, commentText);
      setCommentText('');
    } catch (e) {
      console.log(e);
    }
  };

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
    <View style={styles.mainPostContainer}>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.imageContainer}>
          {myPost?.imgs && (
            <Carousel
              width={width}
              height={480}
              data={myPost.imgs}
              loop={false}
              scrollAnimationDuration={1000}
              onSnapToItem={index => console.log('current index:', index)}
              renderItem={({item}) => (
                <ImageBackground
                  source={{uri: item}}
                  resizeMode="cover"
                  style={{height: 480}}
                />
              )}
            />
          )}
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{myPost?.title}</Text>
          </View>

          <View style={styles.tagContainer}>
            {myPost?.hashtags.map(tag => (
              <View style={{marginRight: 8}} key={tag}>
                <Tag text={tag} />
              </View>
            ))}
          </View>

          <View style={styles.goodOrBadContainer}>
            <View style={{...styles.goodOrBadButton, marginRight: 10}}>
              <Image source={GoodImage} style={styles.goodOrBadImage} />
              <Text style={styles.goodOrBadButtonText}>
                {myPost?.likeCount}
              </Text>
            </View>
            <View style={styles.goodOrBadButton}>
              <Image source={BadImage} style={styles.goodOrBadImage} />
              <Text style={styles.goodOrBadButtonText}>
                {myPost?.dislikeCount}
              </Text>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>{myPost?.description}</Text>
          </View>

          <View style={styles.commentContainer}>
            <View style={styles.commentTopContainer}>
              <Text style={styles.CommentTitle}>댓글</Text>
            </View>
            <View style={styles.commentBottomContainer}>
              <View style={styles.commentBottomCommentContainer}>
                <Text style={styles.nickname} />
                <Text style={styles.comment} />
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
