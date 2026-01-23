"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddToCart({ product }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log(product);

  
  
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product || !product._id) return;
    
    setLoading(true);
    
    try {
      // Get userId from localStorage
      const userId = localStorage.getItem("userId");
      
      if (!userId) {
        alert("Please login to add items to cart");
        router.push("/login");
        return;
      }

      // Call add to cart API
      const response = await fetch(`/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-id": userId,
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      // Revalidate cart items by triggering a revalidation
      // This will refresh the cart data in the Navbar
      if (typeof window !== "undefined") {
        // Dispatch a custom event to notify other components
        window.dispatchEvent(new CustomEvent("cartUpdated"));
      }

      // Show success message
      alert("Added to cart successfully!");
      
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <button
      onClick={handleAddToCart}
      disabled={loading || product.stock === 0}
      className={`mt-4 w-full py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center space-x-2 ${
        product.stock === 0
          ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
      } ${loading ? "opacity-75 cursor-wait" : ""}`}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Adding...</span>
        </>
      ) : (
        <>
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
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span>{product.stock === 0 ? "Out of Stock" : "Add to Cart"}</span>
        </>
      )}
    </button>
  );
}
