"use client";
import Link from "next/link";
import { Search, Bell, LogOut, Moon } from "lucide-react";

import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { removeToken } from "../_lib/cookies";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [{ token: cookieToken }] = useCookies(["token"]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(cookieToken);
  }, [cookieToken]);

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("username");

    window.location.href = "/login";
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
