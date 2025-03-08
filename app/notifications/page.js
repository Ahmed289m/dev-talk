import { Users } from "lucide-react";
import SideBarPosts from "../_components/sideBarPosts";

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        <SideBarPosts />
        {/* Main content */}
        <main className="flex-1 ml-4">
          <div className="border-b border-gray-100">
            <div className="p-4">
              <h1 className="text-2xl font-bold">Notifications</h1>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Users className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-700">New in your network</p>
                <p className="text-gray-500 text-sm">Notification sms</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
