import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  BarChart2,
  Activity,
  ClipboardList,
  Database,
  FileText,
  Bot,
  IdCardLanyard,
  LogOut,
} from "lucide-react";
import { sidebarMenus } from "../utils/sidebarMenus";
import { showConfirm } from "./Confirm";
import authService from "../service/authService";
import { toast } from "sonner";

const iconMap = {
  Dashboard: <Home size={18} />,
  Patients: <Users size={18} />,
  Analytics: <BarChart2 size={18} />,
  Reports: <FileText size={18} />,
  "Master Dashboard": <Database size={18} />,
  "All Patients": <ClipboardList size={18} />,
  Appointments: <Activity size={18} />,
  Users: <IdCardLanyard size={18} />,
};

export default function SidebarMenu({ collapsed, userRole }) {
  const location = useLocation();
  const menus = sidebarMenus[userRole] || [];

  async function handleLogout() {
    const confirmed = await showConfirm({
      message: "Are you sure you want to confirm Logout?",
      okText: "Logout",
      cancelText: "Cancel",
      variant: "delete",
    });

    if (confirmed) {
      try {
        authService.Logout();
        toast.success("Logged out successfully.");
      } catch (error) {
        toast.error("Error logging out. Please try again.");
        console.error("Error logging out:", error);
      }
    } else {
      console.log("User canceled.");
    }
  }

  return (
    <Sidebar
      collapsed={collapsed}
      breakPoint="md"
      transitionDuration={300}
      backgroundColor="#fff"
      rootStyles={{
        color: "#111827",
        width: "16rem",
        height: "100vh",
        position: "fixed",
        left: 0,
        display: "flex",
        flexDirection: "column",
        zIndex: 50,
        borderRight: "1px solid #e5e7eb",
      }}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200 text-lg font-semibold text-gray-900 bg-white flex-shrink-0">
        {collapsed ? (
          <Bot className="text-gray-700" />
        ) : (
          <div className="flex items-center space-x-3">
            <Bot className="text-gray-700" />
            <span>PhageTrack</span>
          </div>
        )}
      </div>

      {/* Menu (scrollable if too long) */}
      <div className="flex-1 overflow-y-auto">
        <Menu
          menuItemStyles={{
            button: {
              padding: "10px 16px",
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "#374151",
              borderRadius: "8px",
              margin: "4px 8px",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#f3f4f6",
                color: "#111827",
              },
              "&.ps-active": {
                backgroundColor: "#e0f2fe",
                color: "#0369a1",
                fontWeight: 600,
              },
            },
            icon: { color: "#6b7280" },
          }}
        >
          {menus.map((item) => (
            <MenuItem
              key={item.path}
              icon={iconMap[item.name] || <Activity size={18} />}
              component={<Link to={item.path} />}
              active={location.pathname === item.path}
            >
              {item.name}
            </MenuItem>
          ))}
        </Menu>
      </div>

      {/* Footer (always stick to bottom) */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white p-4 flex flex-col gap-2">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-red-200 rounded-md transition-colors"
        >
          <LogOut size={16} className="text-gray-600" />
          {!collapsed && <span>Logout</span>}
        </button>

        <div className="text-xs text-gray-400 text-center select-none">
          {collapsed ? "v1.0" : "Version 1.0"}
        </div>
      </div>
    </Sidebar>
  );
}
