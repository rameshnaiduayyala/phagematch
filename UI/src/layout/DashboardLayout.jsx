import { Outlet } from "react-router-dom";
import { useState } from "react";
import SidebarMenu from "../components/Sidebar";
import Header from "../components/Header";
import { useAuthStore } from "../stores/useAuthStore";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuthStore();

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <SidebarMenu collapsed={collapsed} userRole={user?.role_slug} />

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* Header */}
        <Header onToggleSidebar={() => setCollapsed(!collapsed)} />

        {/* Main Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="bg-gray-100 p-2">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-10 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Gazzee Analytics Dashboard
        </footer>
      </div>
    </div>
  );
}
