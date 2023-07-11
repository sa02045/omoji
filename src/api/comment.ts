import axios from './core';

interface CommentData {
  comment: string;
  member: {
    nickname: string;
  };
}
export async function fetchComments(postId: number) {
  const response = await axios.get<CommentData[]>('/posts/${postId}/comments');
  return response.data;
}

export async function postComment(postId: number, comment: string) {
  const response = await axios.post(
    `/posts/${postId}/comments`,
    {
      comment,
      postId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data;
}
