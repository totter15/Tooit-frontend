import { useQueryClient, useInfiniteQuery } from 'react-query';
import { getMyVote } from '../apis/vote';

export default function useMyVote() {
  const queryClient = useQueryClient();

  const getNextPageParam = (lastPage: any) => {
    const lastIndex = lastPage.list.length - 1;
    const lastId = lastPage.list[lastIndex]?.id;
    return lastPage.nextPage ? lastId : undefined;
  };

  const {
    data: myVotes,
    fetchNextPage: fetchNextVote,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['myVote'],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await getMyVote(pageParam);
      return data;
    },
    getNextPageParam,
    staleTime: 50000000,
  });

  const voteList = myVotes?.pages.flatMap((page) => page.list);

  return {
    voteList,
    hasNextPage,
  };
}
