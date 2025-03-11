"use client";
import Link from "next/link";
import { Search, Bell, LogOut, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [token, setToken] = useState(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setToken(localStorage.getItem("token"));

    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/login";
  };

  return (
    <header className="navbar backdrop-blur-md bg-transparent sticky top-0 z-50 w-full">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Link href="/posts">
          <img
            src={theme === "light" ? `/DevLight.png` : `/DevDark.png`}
            width={200}
          />
        </Link>

        <div className="ml-auto flex items-center gap-4 ">
          {theme === "light" ? (
            <div className="p-2 rounded-md bg-green-900/10 ">
              <Moon
                className="transition-all duration-500"
                onClick={() => setTheme("dark")}
              />
            </div>
          ) : (
            <div className="p-2 rounded-md bg-green-900/10 ">
              <Sun
                className="transition-all duration-500"
                onClick={() => setTheme("light")}
              />
            </div>
          )}
          <Link
            href="/notifications"
            className="relative p-2 rounded-md bg-green-900/10   "
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
          </Link>
          {token && (
            <div className="p-2 rounded-md bg-green-900/10 ">
              <LogOut
                className="cursor-pointer h-5 w-5 "
                onClick={handleLogout}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
