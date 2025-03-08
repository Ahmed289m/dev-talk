"use client";

import { Link, Pencil } from "lucide-react";
import { usePostForm } from "../_contexts/PostFormContext";

function AddPostBtn() {
  const { openCloseForm } = usePostForm();

  return (
    <Link
      onClick={() => {
        openCloseForm();
      }}
      href="/write-post"
      className="z-50 fixed bottom-6 right-6 bg-green-500 text-white rounded-full w-13 h-13 flex items-center justify-center shadow-lg hover:bg-green-600"
    >
      <Pencil className="text-white" />
    </Link>
  );
}

export default AddPostBtn;
