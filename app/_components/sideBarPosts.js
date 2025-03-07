"use client";
import { useState } from "react";
import { Home, Newspaper, TrendingUp } from "lucide-react";

const navigationItems = [
  { id: "home", label: "Home", icon: <Home /> },
  { id: "feed", label: "Feed", icon: <Newspaper /> },
  { id: "trending", label: "Trending", icon: <TrendingUp /> },
];
function SideBarPosts() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <aside className="hidden md:block w-64 border-r border-gray-100 min-h-[calc(100vh-64px)] p-4 sticky top-16">
      <nav>
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-green-50 text-green-700"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {Icon}
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default SideBarPosts;
