import {useQuery} from '@tanstack/react-query';
import {fetchMyPosts} from '../../api/post';

export function useFetchMyPosts() {
  return useQuery({
    queryKey: ['myPosts'],
    queryFn: async () => {
      const posts = await fetchMyPosts();
      return posts;
    },
    refetchOnWindowFocus: true,
  });
}
