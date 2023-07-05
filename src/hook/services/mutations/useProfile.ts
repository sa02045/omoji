import {requestPatchProfile} from '../../../api/auth';
import {useMutation} from '@tanstack/react-query';

export function useProfile() {
  return useMutation({
    mutationFn: (nickname: string) => {
      return requestPatchProfile(nickname);
    },
  });
}
