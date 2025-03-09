import PostsPageComponent from "../_components/postsPageComponent";
import { getFeed } from "../_lib/data-services";

export default async function PostsPage() {
  const feed = await getFeed();
  console.log(feed);
  return <PostsPageComponent feed={feed} />;
}
