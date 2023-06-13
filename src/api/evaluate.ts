import axios from './core';

export interface Evaluate {
  id: number;
  imgs: string[];
  title: string;
  hashtags: string[];
}

export async function fetchEvaluate() {
  const response = await axios.get<Evaluate[]>('/evaluate');
  return response.data;
}

export async function postEvaluate(
  evaluateEnum: 'DISLIKE' | 'LIKE',
  postId: number,
) {
  const response = await axios.post('/evaluate', {evaluateEnum, postId});
  return response.data;
}
