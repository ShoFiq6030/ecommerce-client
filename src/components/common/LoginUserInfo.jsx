"use client";

import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function LoginUserInfo() {
  const { data: session, status } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut({ callbackUrl: "/login" });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
      setShowDropdown(false);
    }
  };

  // Show loading state while checking session
  if (status === "loading") {
    return (
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse"></div>
        <div className="hidden md:block">
          <div className="w-24 h-4 bg-white/20 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  // Show nothing if no session
  if (!session) {
    return null;
  }

  let user = session.user;
  if (session.user.user) {
    user = session.user.user;
  }
  console.log(user);

  return (
    <div className="relative">
      {/* User Info Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="User menu"
        aria-expanded={showDropdown}
      >
        {/* User Avatar */}
        <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white/50">
          {user?.image ? (
            <Image
              width={400}
              height={400}
              src={user.image}
              alt={user.name || "User avatar"}
              className="object-cover"
              sizes="32px"
            />
          ) : (
            <div className="w-full h-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}
        </div>

        {/* User Name and Email (Desktop) */}
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-white leading-tight">
            {user?.name || "User"}
          </p>
          <p className="text-xs text-white/80 leading-tight">
            {user?.email || "No email"}
          </p>
        </div>

        {/* Dropdown Arrow */}
        <svg
          className={`w-4 h-4 text-white transition-transform ${
            showDropdown ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <>
          {/* Backdrop to close dropdown */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          ></div>

          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
            {/* User Info Section */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email || "No email"}
              </p>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <button
                onClick={() => {
                  // Navigate to profile page (you can add this page later)
                  setShowDropdown(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Profile</span>
              </button>

              <button
                onClick={() => {
                  // Navigate to settings page (you can add this page later)
                  setShowDropdown(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Settings</span>
              </button>

              <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

              <button
                onClick={handleLogout}
                disabled={loading}
                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                )}
                <span>{loading ? "Signing out..." : "Sign out"}</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
