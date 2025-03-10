import { Home, Newspaper, TrendingUp } from "lucide-react";
import { usePostContext } from "../_contexts/postContext";

const navigationItems = [
  { id: "home", label: "Home", icon: <Home /> },
  { id: "feed", label: "Feed", icon: <Newspaper /> },
  { id: "trending", label: "Trending", icon: <TrendingUp /> },
];

function MobilePostsNav() {
  const { activeTab, setActiveTab } = usePostContext();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
      <ul className="flex justify-around items-center h-16">
        {navigationItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 p-2 ${
                activeTab === item.id ? "text-green-700" : "text-gray-600"
              }`}
            >
              {item.icon}
              <span className="text-xs">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MobilePostsNav;
