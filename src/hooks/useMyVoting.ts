import { useQueryClient, useInfiniteQuery } from 'react-query';
import { getMyVoting } from '../apis/vote';

export default function useMyVoting() {
  const queryClient = useQueryClient();

  const getNextPageParam = (lastPage: any) => {
    const lastIndex = lastPage.list.length - 1;
    const lastId = lastPage.list[lastIndex]?.id;

    return lastPage.nextPage ? lastId : undefined;
  };

  const {
    data: myVotes,
    fetchNextPage: fetchNextVoting,
    hasNextPage,
  } = useInfiniteQuery(
    ['myVoting'],
    ({ pageParam = 0 }) => getMyVoting(pageParam),
    { getNextPageParam },
  );

  const votingList = myVotes?.pages.flatMap((page) => page.list);

  return {
    votingList,
    fetchNextVoting,
    hasNextPage,
  };
}
