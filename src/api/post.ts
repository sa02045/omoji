import {AxiosPromise} from 'axios';
import axios from './core';

export const requestPostPosts = async (data: FormData) => {
  return axios.post('/posts', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const requestGetPost = async (id: string) => {
  return axios.get(`/posts/${id}`);
};

export const requestDeletePost = async (id: string) => {
  return axios.delete(`/posts/${id}`);
};

export const requestPutPost = async (id: string, data: any) => {
  return axios.put(`/posts/${id}`, data);
};

interface Post {
  id: string;
  likeCount: number;
  dislikeCount: number;
  imgs: string[];
  hashtags: string[];
}
interface MyPostsResponse {
  posts: Post[];
}

export async function fetchMyPosts() {
  const response = await axios.get<MyPostsResponse>('/posts/my');
  return response.data.posts;
}

interface MyPostByIdResponse {
  id: number;
  isOwner: boolean;
  title: string;
  description: any;
  likeCount: number;
  dislikeCount: number;
  imgs: string[];
  hashtags: string[];
}

export async function fetchPostById(id: number) {
  const response = await axios.get<MyPostByIdResponse>(`/posts/${id}`);
  return response.data;
}

export async function fetchPostCommentById(postId: number) {
  const response = await axios.get(`/posts/${postId}/comments`);
  return response.data;
}

export async function postCommentById(postId: number, comment: string) {
  const response = await axios.post(`/posts/${postId}/comments`, {
    comment,
    postId,
  });
  return response.data;
}

export const requestGetEvaluate = async () => {
  return axios.get('/evaluate');
};

export const requestPostEvaluate = async (
  postId: string,
  evaluateEnum: string,
) => {
  return axios.post('/evaluate', {postId, evaluateEnum});
};

export const requestPostComment = async (postId: number, comment: string) => {
  return axios.post(`/posts/${postId}/comments`, {
    data: {postid: postId, comment: comment},
  });
};

export interface CommentPost {
  createdAt: string;
  description: string;
  dislikeCount: number;
  hashtagPosts: HashtagPost[];
  id: number;
  isDeleted: boolean;
  likeCount: number;
  member: Member;
  title: string;
  updatedAt: string;
}

export interface HashtagPost {
  hashtag: Hashtag;
  id: number;
}

export interface Hashtag {
  id: number;
  name: string;
}

export interface Member {
  createdAt: string;
  email: string;
  id: number;
  isDeleted: boolean;
  nickname: string;
  refreshToken: string;
  role: string;
  social: string;
  socialId: string;
  updatedAt: string;
}

export interface CommentInformation {
  comment: string;
  id: number;
  post: CommentPost;
}

export type GetCommentsResponse = CommentInformation[];

export const requestGetComments = async (
  postId: number,
): AxiosPromise<GetCommentsResponse> => {
  return axios.get(`/posts/${postId}/comments`);
};

export const requestGetCommentById = async (commentId: number) => {
  return axios.get(`/comments/${commentId}`);
};
