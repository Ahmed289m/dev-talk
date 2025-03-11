"use client";

import { Home, Newspaper, TrendingUp } from "lucide-react";
import { usePostContext } from "../_contexts/postContext";

const navigationItems = [
  { id: "home", label: "Home", icon: <Home /> },
  { id: "feed", label: "Feed", icon: <Newspaper /> },
  { id: "trending", label: "Trending", icon: <TrendingUp /> },
];

function SideBarPosts() {
  const { activeTab, setActiveTab } = usePostContext();

  return (
    <aside className="sidebar hidden md:block w-64 border-r  min-h-[calc(100vh-64px)] p-4 sticky top-16">
      <nav>
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id && "bg-white text-green-500"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default SideBarPosts;
