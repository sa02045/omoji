import {requestPostResign} from '../../../api/auth';
import {useMutation} from '@tanstack/react-query';

export function useResign() {
  return useMutation({
    mutationFn: () => {
      return requestPostResign();
    },
  });
}
