import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square overflow-hidden bg-gray-200 dark:bg-gray-700"></div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>

        {/* Product Name */}
        <div className="space-y-2">
          <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="w-2/3 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Price and Rating */}
        <div className="flex items-center justify-between pt-2">
          <div className="w-16 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="w-12 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Stock Status */}
        <div className="w-20 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
}
