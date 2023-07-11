import {postComment} from '../../../api/comment';
import {useMutation} from '@tanstack/react-query';

export function useUpdateComment() {
  return useMutation({
    mutationFn: (params: {postId: number; comment: string}) => {
      return postComment(params.postId, params.comment);
    },
  });
}
