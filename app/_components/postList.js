import { useInView } from "react-intersection-observer";
import PostItem from "./postItem";
import usePost from "../_lib/usePost";
import { useEffect } from "react";
import { LoadingScreen } from "./loading";
import PaginationLoader from "./pagination-loader";

export default function PostList() {
  const { data, error, status, fetchNextPage, isFetchingNextPage } = usePost();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (status === "pending") return <LoadingScreen />;
  if (status === "error") return <p>Error: {error.message}</p>;

  const posts = data?.pages?.flatMap((page) => page.posts);
  if (status === "success")
    return (
      <div className="space-y-8">
        {posts.map((post) => (
          <PostItem key={post.postId} post={post} />
        ))}
        <div ref={ref}>{isFetchingNextPage && <PaginationLoader />}</div>
      </div>
    );
}
