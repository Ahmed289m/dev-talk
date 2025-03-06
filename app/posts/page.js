"use client";
import { useInView } from "react-intersection-observer";
import AddPostBtn from "../_components/addPostBtn";
import PostList from "../_components/postList";
import { Suspense, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../_lib/data-services";
import usePost from "../_lib/usePost";

export default function PostsPage() {
  return (
    <div className="min-h-screen bg-white relative">
      <div className="flex">
        <main className="flex-1">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Home</h1>
            <PostList />
          </div>
        </main>
      </div>

      <AddPostBtn />
    </div>
  );
}
