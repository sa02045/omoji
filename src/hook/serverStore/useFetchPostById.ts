import {useQuery} from '@tanstack/react-query';
import {fetchPostById} from '../../api/post';

export function useFetchPostById(id: number) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const data = await fetchPostById(id);
      return data;
    },
  });
}
