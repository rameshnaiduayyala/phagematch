import { Menu, ChevronDown } from "lucide-react";

export default function Header({ onToggleSidebar }) {
  return (
    <header className="bg-gray-800 px-6 py-3 flex items-center justify-between shadow-md sticky top-0 z-40">
      {/* Left: Hamburger + Page Title */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-xl font-semibold text-white">Dashboard</h1>
      </div>

      {/* Right: User avatar and actions */}
      <div className="flex items-center space-x-4">
        {/* Optional Notifications Icon */}
        {/* <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
          <Bell size={20} />
        </button> */}

        {/* User dropdown */}
        <div className="relative group">
          <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full transition-all">
            <img
              src="https://i.pravatar.cc/40"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-white font-medium hidden md:block">Tech Rammy</span>
            <ChevronDown size={16} className="text-white" />
          </button>

          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-40 bg-gray-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
            <ul className="flex flex-col p-2">
              <li>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-600 rounded-md text-white">
                  Profile
                </button>
              </li>
              <li>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-600 rounded-md text-white">
                  Settings
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-red-600 rounded-md text-white"
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
