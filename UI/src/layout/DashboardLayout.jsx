import { Outlet } from "react-router-dom";
import { useState } from "react";
import SidebarMenu from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <SidebarMenu collapsed={collapsed} />

      <div
        className={`flex flex-col flex-1 ml-64 transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Header onToggleSidebar={() => setCollapsed(!collapsed)} />
        <main className="p-6 overflow-y-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
