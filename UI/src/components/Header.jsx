import {
  Menu,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";

import { useAuthStore } from "../stores/useAuthStore";

export default function Header({ onToggleSidebar }) {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
      {/* Left: Hamburger + Page Title */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Toggle sidebar"
        >
          <Menu size={22} className="text-gray-700" />
        </button>
      </div>

      {/* Right: User avatar and actions */}
      <div className="flex items-center space-x-4">
        {/* User dropdown */}

        <div className="relative group">
          {/* Profile Button */}
          <button className="flex items-center space-x-3 bg-white hover:bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 transition-all shadow-sm">
            {user?.avatarUrl ? (
              <img
                src={user?.avatar}
                alt="User Avatar"
                className="w-9 h-9 rounded-full border border-gray-200 object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-gray-600 font-semibold">
                {user?.name?.charAt(0)}
              </div>
            )}
            <div className="hidden md:flex flex-col items-start text-left">
              <span className="text-gray-900 text-sm font-medium leading-tight">
                {user?.name || "Guest User"}
              </span>
              <span className="text-xs text-gray-500 flex items-center space-x-1">
                <Shield size={12} className="text-blue-500" />
                <span className="capitalize">{user?.role || "Loading..."}</span>
              </span>
            </div>
            <ChevronDown size={16} className="text-gray-600" />
          </button>

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
            <ul className="flex flex-col py-2">
              <li>
                <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <User size={16} className="mr-2 text-gray-500" />
                  Profile
                </button>
              </li>
              <li>
                <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <Settings size={16} className="mr-2 text-gray-500" />
                  Settings
                </button>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
