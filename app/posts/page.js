import PostsPageComponent from "../_components/postsPageComponent";
import { getCategories } from "../_lib/data-services";

export default async function PostsPage() {
  const categories = await getCategories();
  return <PostsPageComponent categories={categories} />;
}
