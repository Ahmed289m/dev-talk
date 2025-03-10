import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { LoadingScreen } from "./loading";
import PaginationLoader from "./pagination-loader";
import PostItem from "./postItem";
import usePost from "../_lib/usePost";
import useFeed from "../_lib/useFeed";
import useTrend from "../_lib/useTrend";
import { usePostContext } from "../_contexts/postContext";

export default function PostList() {
  const { activeTab } = usePostContext();

  const postData = usePost();
  const feedData = useFeed();
  const trendData = useTrend();

  let data, error, status, fetchNextPage, isFetchingNextPage;

  if (activeTab === "home") {
    ({ data, error, status, fetchNextPage, isFetchingNextPage } = postData);
  } else if (activeTab === "feed") {
    ({ data, error, status, fetchNextPage, isFetchingNextPage } = feedData);
  } else if (activeTab === "trending") {
    ({ data, error, status, fetchNextPage, isFetchingNextPage } = trendData);
  }

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && fetchNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (status === "pending") return <LoadingScreen />;
  if (status === "error") return <p>Error: {error.message}</p>;

  const posts = data?.pages?.flatMap((page) => page.posts) || [];

  return (
    <div className="space-y-8">
      {posts.length > 0 ? (
        posts.map((post) => <PostItem key={post.postId} post={post} />)
      ) : (
        <div>No posts available</div>
      )}
      <div ref={ref}>{isFetchingNextPage && <PaginationLoader />}</div>
    </div>
  );
}
