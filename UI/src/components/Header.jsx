import { Menu, ChevronDown } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function Header({ onToggleSidebar }) {
  const { user, logout } = useContext(AuthContext);

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
        <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
          Dashboard
        </h1>
      </div>

      {/* Right: User avatar and actions */}
      <div className="flex items-center space-x-4">
        {/* User dropdown */}
        <div className="relative group">
          <button className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 px-3 py-1 rounded-full transition-all">
            <img
              src="https://i.pravatar.cc/40"
              alt="User Avatar"
              className="w-8 h-8 rounded-full border border-gray-200"
            />
            <span className="text-gray-800 font-medium hidden md:block">
              {user ? user.name : "Guest"}
            </span>
            <ChevronDown size={16} className="text-gray-600" />
          </button>

          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
            <ul className="flex flex-col p-2">
              <li>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-gray-800">
                  Profile
                </button>
              </li>
              <li>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-gray-800">
                  Settings
                </button>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 rounded-md transition-colors"
                >
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
