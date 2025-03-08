import { useInfiniteQuery } from "@tanstack/react-query";
import { getTrending } from "./data-services";

function usePost() {
  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["trends"],
      queryFn: getTrending,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return (
          {
            timeCursor: lastPage.timeCursor,
            scoreCursor: lastPage.scoreCursor,
            id_cursor: lastPage.id_cursor,
          } || null
        );
      },
    });
  return { data, error, status, fetchNextPage, isFetchingNextPage };
}

export default usePost;
