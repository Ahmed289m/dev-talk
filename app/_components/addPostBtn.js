"use client";

import { addPost } from "@/redux/postSlice";
import { Link, Pencil } from "lucide-react";
import { useDispatch } from "react-redux";

function AddPostBtn() {
  const dispatch = useDispatch();
  return (
    <Link
      onClick={() => {
        dispatch(addPost("ahmed", "ahmed"));
      }}
      href="/write-post"
      className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full w-13 h-13 flex items-center justify-center shadow-lg hover:bg-green-600"
    >
      <Pencil className="text-white" />
    </Link>
  );
}

export default AddPostBtn;
