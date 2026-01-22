"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function CategoryNavbar({ isOpen, onClose }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    try {
      fetchCategories();
      async function fetchCategories() {
        // Build API URL
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
        const url = `${API_BASE_URL}/categories`;
        const response = await fetch(url);
        const data = await response.json();
        setCategories(data?.categories || []);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Icon mapping for each category
  const categoryIcons = {
    camera: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    phone: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
    monitor: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    laptop: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    desktop: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  };

  return (
    <>
      {/* Desktop View - Horizontal Navigation */}
      <nav className="hidden sm:block bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Categories Navigation */}
            <div className="flex items-center space-x-1 overflow-x-auto">
              {categories.length === 0 ? (
                // Skeleton Loader
                <>
                  {[1, 2, 3, 4, 5].map((skeleton) => (
                    <div
                      key={skeleton}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg  dark:bg-gray-700 animate-pulse whitespace-nowrap"
                    >
                      <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="w-16 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                  ))}
                </>
              ) : (
                categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/products?category=${category.name}`}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 whitespace-nowrap group"
                  >
                    <span className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                      {categoryIcons[category.name] || categoryIcons.desktop}
                    </span>
                    <span className="font-medium capitalize text-sm">
                      {category.name}
                    </span>
                  </Link>
                ))
              )}
            </div>

            {/* View All Categories Link */}
            <Link
              href="/categories"
              className="flex items-center space-x-1 px-4 py-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 font-medium text-sm"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span>All Categories</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile View - Sidebar */}
      <div
        className={`sm:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

        {/* Sidebar */}
        <div
          className={`absolute left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Categories
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Categories List */}
          <div className="overflow-y-auto h-[calc(100%-60px)] p-4">
            <div className="space-y-2">
              {categories.length === 0 ? (
                // Skeleton Loader for Mobile
                <>
                  {[1, 2, 3, 4, 5].map((skeleton) => (
                    <div
                      key={skeleton}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"
                    >
                      <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="w-20 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                  ))}
                </>
              ) : (
                categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/products?category=${category.name}`}
                    onClick={onClose}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group"
                  >
                    <span className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                      {categoryIcons[category.name] || categoryIcons.desktop}
                    </span>
                    <span className="font-medium capitalize text-sm">
                      {category.name}
                    </span>
                  </Link>
                ))
              )}

              {/* View All Categories Link */}
              <Link
                href="/categories"
                onClick={onClose}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 font-medium text-sm mt-4 border-t border-gray-200 dark:border-gray-700 pt-4"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <span>View All Categories</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
