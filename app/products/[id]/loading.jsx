import { Card, CardFooter, CardHeader } from "@/components/ui/card";

const SkeletonBlock = ({ className = "" }) => (
  <div className={`bg-gray-200 dark:bg-gray-700 rounded ${className}`} />
);

const SkeletonCircle = ({ className = "" }) => (
  <div className={`bg-gray-200 dark:bg-gray-700 rounded-full ${className}`} />
);

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button Skeleton */}
        <SkeletonBlock className="mb-8 h-6 w-32 rounded" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images Skeleton */}
          <div className="space-y-4">
            <SkeletonBlock className="aspect-square rounded-2xl overflow-hidden" />

            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonBlock
                  key={i}
                  className="w-20 h-20 rounded-lg shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Product Details Skeleton */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-3">
              <SkeletonBlock className="h-8 w-3/4" />
              <div className="flex items-center gap-3">
                <SkeletonBlock className="h-6 w-20" />
                <SkeletonBlock className="h-4 w-24" />
              </div>
            </div>

            {/* Price & Rating */}
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <SkeletonBlock className="h-10 w-32" />
                <SkeletonBlock className="h-5 w-24" />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonBlock key={i} className="w-5 h-5" />
                  ))}
                </div>
                <SkeletonBlock className="h-4 w-20" />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-5/6" />
              <SkeletonBlock className="h-4 w-4/6" />
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4 bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <SkeletonBlock className="h-3 w-16" />
                  <SkeletonBlock className="h-4 w-20" />
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <SkeletonBlock className="h-12 w-full rounded-lg" />
              <div className="flex gap-3">
                {Array.from({ length: 2 }).map((_, i) => (
                  <SkeletonBlock key={i} className="h-12 w-12 rounded-lg" />
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
              <div className="flex items-center gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <SkeletonCircle className="w-2 h-2" />
                    <SkeletonBlock className="h-4 w-20" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <SkeletonBlock className="h-8 w-48 mb-6" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="bg-white dark:bg-gray-800">
                <SkeletonBlock className="aspect-square rounded-t-xl" />

                <CardHeader className="pb-3">
                  <SkeletonBlock className="h-5 w-32 mb-2" />
                  <SkeletonBlock className="h-4 w-24" />
                </CardHeader>

                <CardFooter className="pt-0">
                  <SkeletonBlock className="h-6 w-20" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
