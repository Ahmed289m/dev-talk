import { useInfiniteQuery } from "@tanstack/react-query";
import useAuth from "./hooks/useAuth";

function useFeed() {
  const axiosInstance = useAuth();

  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["feeds"],
      queryFn: async ({
        pageParam = { timeCursor: "", scoreCursor: 0, idCursor: "" },
      }) => {
        try {
          const response = await axiosInstance.get(`/Post/feed`, {
            params: {
              timeCursor: pageParam.timeCursor,
              scoreCursor: pageParam.scoreCursor,
              idCursor: pageParam.idCursor,
            },
          });

          return {
            timeCursor: response.data.result.time_cursor,
            scoreCursor: response.data.result.score_cursor,
            idCursor: response.data.result.id_cursor,
            posts: response.data.result.posts,
          };
        } catch (error) {
          console.error("Error fetching feed:", error);
          throw new Error(
            error?.response?.data?.message || "Failed to fetch feed"
          );
        }
      },
      initialPageParam: { timeCursor: "", scoreCursor: 0, idCursor: "" },
      getNextPageParam: (lastPage) =>
        lastPage?.id_cursor
          ? {
              timeCursor: lastPage.time_cursor,
              scoreCursor: lastPage.score_cursor,
              idCursor: lastPage.id_cursor,
            }
          : null,
    });

  return { data, error, status, fetchNextPage, isFetchingNextPage };
}

export default useFeed;
