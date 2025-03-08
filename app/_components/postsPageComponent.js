"use client";
import AddEditPostForm from "../_components/addEdit-postForm";
import AddPostBtn from "../_components/addPostBtn";
import MobilePostsNav from "../_components/mobilePostsNav";
import PostList from "../_components/postList";
import SideBarPosts from "../_components/sideBarPosts";
import { usePostForm } from "../_contexts/PostFormContext";
function PostsPageComponent({ categories }) {
  const { isFormOpen, setIsFormOpen } = usePostForm();
  return (
    <div className="min-h-screen bg-white relative flex">
      <SideBarPosts />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Home</h1>
        <PostList />
      </main>

      <AddPostBtn />
      <MobilePostsNav />

      {isFormOpen && (
        <div className="absolute left">
          <AddEditPostForm categories={categories} />
        </div>
      )}
    </div>
  );
}

export default PostsPageComponent;
