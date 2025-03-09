import AddEditPostForm from "@/app/_components/addEdit-postForm";
import { getCategories } from "@/app/_lib/data-services";

async function AddPostPage() {
  const categories = await getCategories();

  return <AddEditPostForm categories={categories} />;
}

export default AddPostPage;
