"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import LoginUserInfo from "./LoginUserInfo";
import { ModeToggle } from "./ModeToggle";
import { Search } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();

  const isActive = true;

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-gray-800 dark:to-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-white hover:text-blue-100 transition-colors"
            >
              E-Shop
            </Link>
          </div>
          in
          <Search className="text-white" />

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className={`text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-white/20 text-white shadow-sm"
                  : "text-blue-100 hover:bg-white/10 hover:text-white"
              }`}
            >
              Home
            </Link>

            <Link
              href="/products"
              className={`text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-white/20 text-white shadow-sm"
                  : "text-blue-100 hover:bg-white/10 hover:text-white"
              }`}
            >
              Products
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ModeToggle />

            {status === "loading" ? (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse"></div>
                <div className="hidden md:block">
                  <div className="w-24 h-4 bg-white/20 rounded animate-pulse"></div>
                </div>
              </div>
            ) : session ? (
              <LoginUserInfo />
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-white/90 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
