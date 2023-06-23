import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Tag} from '../components/Tag';
import BadImage from '../assets/hmm.png';
import GoodImage from '../assets/good.png';
import {ScrollView} from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {fetchPostById, postCommentById} from '../api/post';
import {EvaluateButton} from '../components/EvaluateButton';
import {ImageCard} from '../components/ImageCard';
import {Lottie} from '../components/Lottie';
import {postEvaluate} from '../api/evaluate';
type Params = {
  id: number;
};

export function PostScreen() {
  const route = useRoute();
  const {id} = route.params as Params;
  const [commentText, setCommentText] = useState('');
  const [lottieType, setLottieType] = useState<'good' | 'bad' | null>(null);
  const [evaluatedType, setEvaluatedType] = useState<'good' | 'bad' | null>(
    null,
  );

  const [goodEvaluatedCount, setGoodEvaluatedCount] = useState(0);
  const [badEvaluatedCount, setBadEvaluatedCount] = useState(0);

  const {data: post, isLoading} = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const data = await fetchPostById(id);
      return data;
    },
  });

  useEffect(() => {
    if (post) {
      setGoodEvaluatedCount(post.dislikeCount);
      setBadEvaluatedCount(post.likeCount);
    }

    if (evaluatedType === 'good') {
      setGoodEvaluatedCount(prev => prev + 1);
    } else if (evaluatedType === 'bad') {
      setBadEvaluatedCount(prev => prev + 1);
    }
  }, [evaluatedType, setBadEvaluatedCount, post]);

  // const {data: comments, refetch} = useQuery({
  //   queryKey: ['postComments', id],
  //   queryFn: async () => {
  //     const {data} = await requestGetComments(id);
  //     return data;
  //   },
  // });

  const onPressPostComment = async () => {
    await postCommentById(id, commentText);
    setCommentText('');
  };

  // const onPressPostComment = async () => {
  //   try {
  //     await postCommentById(id, commentText);
  //     setCommentText('');
  //   } catch (e) {
  //   } finally {
  //   }
  // };

  const onPressLottie = useCallback(
    async (type: 'good' | 'bad', postId: number) => {
      if (evaluatedType) {
        return;
      }
      setLottieType(type);
      setEvaluatedType(type);
      setTimeout(() => {
        setLottieType(null);
      }, 1000);
      if (type === 'good') {
        await postEvaluate('LIKE', postId);
      } else {
        await postEvaluate('DISLIKE', postId);
      }
    },
    [setLottieType, evaluatedType],
  );

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
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="height"
      keyboardVerticalOffset={100}>
      <View style={styles.mainPostContainer}>
        <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.imageContainer}>
            {post && (
              <View style={{height: 480, width}}>
                <ImageCard
                  title={post.title}
                  imgs={post.imgs}
                  goPostScreen={() => {}}
                  postId={id}
                  hideLinearHeight={true}
                />
              </View>
            )}

            {post && !post.isOwner && (
              <View style={styles.evaluateButtonContainer}>
                <EvaluateButton
                  type="hmm"
                  onPress={() => {
                    onPressLottie('bad', id);
                  }}
                />
                <EvaluateButton
                  type="good"
                  onPress={() => {
                    onPressLottie('good', id);
                  }}
                />
              </View>
            )}
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{post?.title}</Text>
            </View>

            <View style={styles.tagContainer}>
              {post?.hashtags.map(tag => (
                <View style={{marginRight: 8}} key={tag}>
                  <Tag text={tag} />
                </View>
              ))}
            </View>

            <View style={styles.goodOrBadContainer}>
              <View style={{...styles.goodOrBadButton, marginRight: 10}}>
                <Image source={GoodImage} style={styles.goodOrBadImage} />
                <Text style={styles.goodOrBadButtonText}>
                  {goodEvaluatedCount}
                </Text>
              </View>
              <View style={styles.goodOrBadButton}>
                <Image source={BadImage} style={styles.goodOrBadImage} />
                <Text style={styles.goodOrBadButtonText}>
                  {badEvaluatedCount}
                </Text>
              </View>
            </View>

            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>{post?.description}</Text>
            </View>

            <View style={styles.commentContainer}>
              <View style={styles.commentTopContainer}>
                <Text style={styles.CommentTitle}>댓글</Text>
              </View>

              <View style={styles.commentBottomContainer}>
                <View style={styles.commentBottomCommentContainer}>
                  <Text style={styles.nickname} />
                  <Text style={styles.comment}>comment</Text>
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
    </KeyboardAvoidingView>
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
