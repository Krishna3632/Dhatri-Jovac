// src/components/SideBar.jsx
import React from "react";
import { Heart, Settings, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function SideBar({ sidebarNavItems, userNavItem, onNavigate }) {
  return (
    <aside className="w-20 fixed h-screen bg-white/80 backdrop-blur-lg p-4 flex flex-col items-center space-y-8 shadow-sm border-r border-gray-200/80">
      {/* ✨ Top Logo/Icon */}
      <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
        <Heart className="w-6 h-6 text-white" />
      </div>

      {/* ✨ Navigation Section */}
      <nav className="flex flex-col items-center space-y-6">
        {sidebarNavItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `p-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-500 hover:bg-gray-100"
              }`
            }
          >
            {item.icon}
          </NavLink>
        ))}
      </nav>

      {/* ✨ Bottom Section (Profile + Settings + Logout) */}
      <div className="mt-auto flex flex-col items-center space-y-6">
        {/* User Profile Icon */}
        <button
          onClick={() => onNavigate(`/${userNavItem.path}`)}
          className="p-3 text-gray-500 hover:bg-gray-100 rounded-lg"
          title={userNavItem.id}
        >
          {userNavItem.icon}
        </button>

        {/* Settings */}
        <button className="p-3 text-gray-500 hover:bg-gray-100 rounded-lg">
          <Settings />
        </button>

        {/* Logout */}
        <button
          onClick={() => onNavigate("/login")}
          className="p-3 text-gray-500 hover:bg-gray-100 rounded-lg"
        >
          <LogOut />
        </button>
      </div>
    </aside>
  );
}
