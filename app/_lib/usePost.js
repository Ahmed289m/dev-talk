import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "./data-services";

function usePost() {
  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: getPosts,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.id_cursor || null;
      },
    });
  return { data, error, status, fetchNextPage, isFetchingNextPage };
}

export default usePost;
