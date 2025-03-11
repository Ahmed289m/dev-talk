"use client";

import { Pencil } from "lucide-react";
import Link from "next/link";

function AddPostBtn() {
  return (
    <Link
      href="posts/addPost"
      className="add-post-btn z-50 fixed bottom-18 right-4 opacity-80 hover:opacity-100 bg-green-500 text-white rounded-full w-13 h-13 flex items-center justify-center shadow-lg hover:bg-green-600"
    >
      <Pencil />
    </Link>
  );
}

export default AddPostBtn;
