import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { Home, Info, BarChart2, Bot } from "lucide-react";

export default function SidebarMenu({ collapsed }) {
  const location = useLocation();

  return (
    <Sidebar
      collapsed={collapsed}
      backgroundColor="#1f2937"
      rootStyles={{
        color: "white",
        borderRight: "1px solid #374151",
        width: "16rem",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        zIndex: 50,
      }}
    >
      {/* Logo / Header */}
      <div className="h-16 flex items-center justify-center border-b border-gray-700 text-lg font-semibold flex-shrink-0">
        {collapsed ? (
          <Bot />
        ) : (
          <div className="flex items-center space-x-4 gap-2">
            <Bot /> PageMatch
          </div>
        )}
      </div>

      {/* Scrollable Menu */}
      <div className="flex-1 overflow-y-auto">
        <Menu
          menuItemStyles={{
            button: {
              "&.active": {
                backgroundColor: "#374151",
                color: "#60a5fa",
              },
              "&:hover": {
                backgroundColor: "#4b5563",
              },
            },
          }}
        >
          <MenuItem
            icon={<Home size={18} />}
            routerLink={<Link to="/dashboard" />}
            className={location.pathname === "/dashboard" ? "active" : ""}
          >
            Dashboard
          </MenuItem>

          <MenuItem
            icon={<Info size={18} />}
            routerLink={<Link to="/about" />}
            className={location.pathname === "/about" ? "active" : ""}
          >
            About
          </MenuItem>

          <SubMenu label="Charts" icon={<BarChart2 size={18} />}>
            <MenuItem>Pie Charts</MenuItem>
            <MenuItem>Line Charts</MenuItem>
          </SubMenu>
        </Menu>
      </div>
    </Sidebar>
  );
}
