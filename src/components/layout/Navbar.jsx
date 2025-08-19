import React from "react";
import { useAuth } from "../context/AuthContext"; // ✅ import hook
import { Code } from "lucide-react"; // lucide icon for coding logo

export default function Navbar() {
  const { user, logout } = useAuth(); // ✅ now it works

  return (
    <header className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <h1 className="text-lg font-bold">CodePulse</h1>
        {/* Coding logo */}
        <Code className="h-6 w-6 text-blue-400 animate-pulse" />
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-gray-300">Hi, {user.name}</span>
            <button
              onClick={logout}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <a
            href="/login"
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
          >
            Login
          </a>
        )}
      </div>
    </header>
  );
}
