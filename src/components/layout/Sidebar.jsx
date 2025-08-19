import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Trophy,
  TrendingUp,
  MessageSquare,
  Settings,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function Sidebar({ isOpen = true, onClose = () => {} }) {
  const { user } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Problems", href: "/problems", icon: FileText },
    { name: "Contests", href: "/contests", icon: Trophy },
    { name: "Progress", href: "/progress", icon: TrendingUp },
    { name: "Discussion", href: "/discussion", icon: MessageSquare },
  ];

  if (user?.role === "instructor") {
    navigation.push({ name: "Admin Panel", href: "/admin", icon: Settings });
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`
        fixed left-0 top-0 h-full w-64 bg-gray-800 border-r border-gray-700 z-50 transform transition-transform duration-200 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        lg:relative lg:z-auto
      `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700 lg:hidden">
          <h2 className="text-lg font-semibold text-white">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => window.innerWidth < 1024 && onClose()}
                className={`
                  flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }
                `}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
}
