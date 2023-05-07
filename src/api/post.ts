import axios from './core';

export const requestPostPosts = async (data: any) => {
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

export const requestGetMyPosts = async () => {
  return axios.get('/posts/my');
};

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
