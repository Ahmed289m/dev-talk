"use client";

import { Pencil } from "lucide-react";
import Link from "next/link";

function AddPostBtn() {
  return (
    <Link
      href="posts/addPost"
      className="z-50 fixed bottom-6 right-6 bg-green-500 text-white rounded-full w-13 h-13 flex items-center justify-center shadow-lg hover:bg-green-600"
    >
      add
    </Link>
  );
}

export default AddPostBtn;
