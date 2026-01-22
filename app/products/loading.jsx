import ProductCardSkeleton from "@/src/components/products/ProductCardSkeleton";

export default function Loading() {
  // Show 8 skeleton cards while loading
  const skeletonArray = Array.from({ length: 8 });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header Skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="w-48 h-9 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="w-64 h-4 mt-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skeletonArray.map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
