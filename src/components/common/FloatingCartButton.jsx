"use client";

import { ShoppingCart } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function FloatingCartButton() {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  
  const { data } = useQuery({
    queryKey: ["cartItems"],
    queryFn: async () => {
      const res = await fetch("/api/cart");
      return res.json();
    },
    
  });
  
  const cartItems = data?.session?.items || [];
  const cartCount = cartItems?.length || 0;

  // Listen for cartUpdated event to revalidate cart
  useEffect(() => {
    const handleCartUpdate = () => {
      queryClient.invalidateQueries(["cartItems"]);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("cartUpdated", handleCartUpdate);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("cartUpdated", handleCartUpdate);
      }
    };
  }, [queryClient]);

  if (status === "loading") {
    return null; // Don't show while loading session
  }

  // if (!session) {
  //   return null; // Don't show if not logged in
  // }

  return (
    <Link
      href="/cart"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="relative hidden md:block">
        {/* Main Button */}
        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
          <ShoppingCart className="text-white w-6 h-6" />
          
          {/* Pulse Animation */}
          <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-30 animate-ping"></div>
        </div>

        {/* Cart Count Badge */}
        {cartCount > 0 && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md animate-bounce">
            {cartCount > 99 ? "99+" : cartCount}
          </div>
        )}

        {/* Tooltip */}
        <div className="absolute bottom-full mb-2 right-0 bg-gray-900 dark:bg-gray-800 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg pointer-events-none">
          View Cart ({cartCount} items)
          <div className="absolute bottom-0 right-4 transform translate-y-full">
            <div className="border-4 border-transparent border-t-gray-900 dark:border-t-gray-800"></div>
          </div>
        </div>
      </div>

      {/* Mobile-only indicator (for smaller screens) */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 rounded-full shadow-lg flex items-center justify-center">
          <ShoppingCart className="text-white w-5 h-5" />
          {cartCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold animate-bounce">
              {cartCount > 99 ? "99+" : cartCount}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
