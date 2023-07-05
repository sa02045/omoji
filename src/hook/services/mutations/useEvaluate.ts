import {useQuery} from '@tanstack/react-query';
import {fetchEvaluate} from '../../../api/evaluate';
import {UseQueryOptions} from '@tanstack/react-query';

export function useEvaluate() {
  return useQuery({
    queryKey: ['evaluates'],
    queryFn: async () => {
      const evaluates = await fetchEvaluate();
      return evaluates;
    },
  });
}
