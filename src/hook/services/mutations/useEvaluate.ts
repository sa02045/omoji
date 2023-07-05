import {useQuery} from '@tanstack/react-query';
import {fetchEvaluate} from '../../../api/evaluate';

export function useEvaluate() {
  return useQuery({
    queryKey: ['evaluates'],
    queryFn: async () => {
      const evaluates = await fetchEvaluate();
      return evaluates;
    },
  });
}
