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

export async function fetchMyPostById(id: number) {
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

export const requestPostComment = async (postId: string, comment: string) => {
  return axios.post(`/posts/${postId}/comments`, {comment});
};

export const requestGetComments = async (postId: string) => {
  return axios.get(`/posts/${postId}/comments`);
};
