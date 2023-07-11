import {useQuery} from '@tanstack/react-query';
import {fetchComments} from '../../../api/comment';

export function useFetchComments(postId: number) {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const posts = await fetchComments(postId);
      return posts;
    },
  });
}
