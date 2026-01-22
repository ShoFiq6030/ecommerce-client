"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import LoginUserInfo from "./LoginUserInfo";
import { ModeToggle } from "./ModeToggle";
import { Search, X, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import CartButton from "./CartButton";

export default function Navbar({ toggleSidebar }) {
  const { data: session, status } = useSession();
  const [openSearchInput, setOpenSearchInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  // console.log(process.env.NEXT_PUBLIC_API_URL);

  // Debounce search
  useEffect(() => {
    if (searchTerm.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsSearching(true);
      try {
        // Build API URL
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

        const url = `${API_BASE_URL}/products?search=${encodeURIComponent(searchTerm)}`;

        // Prepare headers
        const headers = {
          "Content-Type": "application/json",
        };

        // Make direct fetch request
        const response = await fetch(url, {
          method: "GET",
          headers,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const results = await response.json();
        setSearchResults(results.products || []);
        setShowResults(true);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setShowResults(false);
  };

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-gray-800 dark:to-gray-900 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              {/* Hamburger Menu - Mobile Only */}
              <button
                onClick={toggleSidebar}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors mr-2"
              >
                <Menu className="text-white" size={24} />
              </button>
              <Link
                href="/"
                className="text-xl font-bold text-white hover:text-blue-100 transition-colors"
              >
                E-Shop
              </Link>
              {/* desktop only search */}
              <div className="relative ml-10 hidden md:block">
                <input
                  type="text"
                  className="rounded-lg bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 w-48 md:w-64 lg:w-80 pl-4 pr-10 py-2 transition-all duration-200"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchInput}
                />
                {searchTerm ? (
                  <X
                    className="text-white absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-blue-200"
                    onClick={clearSearch}
                    size={18}
                  />
                ) : (
                  <Search className="text-white absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" />
                )}
              </div>
              {/* mobile search */}
              <div
                className="ml-5 md:hidden cursor-pointer"
                onClick={() => setOpenSearchInput(!openSearchInput)}
              >
                <Search
                  className={` ${openSearchInput ? "text-red-600" : "text-white"}`}
                />
              </div>
            </div>
            {openSearchInput && (
              <div className="absolute top-16 left-0 w-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-gray-800 dark:to-gray-900 p-4 md:hidden">
                <div className="relative">
                  <input
                    type="text"
                    className="rounded-lg bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 w-full pl-4 pr-10 py-2 transition-all duration-200"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchInput}
                  />
                  {searchTerm ? (
                    <X
                      className="text-white absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-blue-200"
                      onClick={clearSearch}
                      size={18}
                    />
                  ) : (
                    <Search className="text-white absolute right-3 top-1/2 transform -translate-y-1/2 " />
                  )}
                </div>
              </div>
            )}

            {/* Auth Buttons */}

            <div className="flex items-center space-x-4">
              {/* cart button  */}
              <CartButton />

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

      {/* Search Results Dropdown */}
      {showResults && searchTerm.trim().length >= 2 && (
        <div className="fixed top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-gray-700 dark:text-gray-200 font-semibold">
                Search Results
              </h3>
              <button
                onClick={clearSearch}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={18} />
              </button>
            </div>

            {isSearching ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {searchResults.map((product) => (
                  <Link
                    key={product._id}
                    href={`/products/${product._id}`}
                    className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-700"
                  >
                    <div className="flex items-center space-x-3">
                      {product.images && product.images[0] && (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                          width={48}
                          height={48}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 dark:text-white font-medium truncate">
                          {product.name}
                        </p>
                        <p className="text-blue-600 dark:text-blue-400 font-bold">
                          ${product.price?.toFixed(2) || "0.00"}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No products found matching {searchTerm}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
