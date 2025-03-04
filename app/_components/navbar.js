"use client";
import Link from "next/link";
import { Search, Bell, LogOut } from "lucide-react";
import { logout, refreshToken } from "@/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const dispatch = useDispatch();
  const { token, expTime } = useSelector((state) => state.auth);
  const router = useRouter();

  {
    /*const expDay = expTime.split("T")[0].split("-")[2];
  const currentDate = new Date();
  const currendDay = currentDate.toString().split(" ")[2];
  if (expDay <= currendDay) dispatch(refreshToken());*/
  }

  const handleLogout = () => {
    dispatch(logout());

    Swal.fire({
      title: "Success!",
      text: "You have Logged Out successfully.",
      icon: "success",
      confirmButtonText: "OK",
    });
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Link href="/posts">
          <img src="/DevLight.png" width={200} />
        </Link>

        <div className="ml-auto flex items-center gap-4">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search"
              className="pl-10 pr-4 py-2 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
            />
          </div>

          <Link
            href="/notifications"
            className="relative p-2 rounded-full hover:bg-gray-100"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
          </Link>

          {token && (
            <LogOut className="cursor-pointer" onClick={handleLogout} />
          )}
        </div>
      </div>
    </header>
  );
}
