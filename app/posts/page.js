import PostsPageComponent from "../_components/postsPageComponent";
import { getCategories, getFeed } from "../_lib/data-services";

export default async function PostsPage() {
  /*const feed = await getFeed({
    timeCursor: "",
    scoreCursor: 0,
    idCursor: "",
    size: 5,
  });
  console.log(feed);*/
  const categories = await getCategories();
  return <PostsPageComponent categories={categories} />;
}
