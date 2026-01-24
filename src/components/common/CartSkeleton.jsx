import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
    />
  );
}

function CartItemSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Image */}
          <Skeleton className="w-24 h-24 rounded-lg flex-shrink-0" />

          {/* Details */}
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="w-5 h-5" />
            </div>

            {/* Qty + Price */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="w-10 h-4" />
                <Skeleton className="w-8 h-8 rounded-full" />
              </div>

              <div className="text-right space-y-1">
                <Skeleton className="h-5 w-20 ml-auto" />
                <Skeleton className="h-3 w-16 ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function OrderSummarySkeleton() {
  return (
    <Card className="sticky top-8">
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Rows */}
        <div className="space-y-3">
          {[
            { left: "w-20", right: "w-16" },
            { left: "w-20", right: "w-12" },
            { left: "w-24", right: "w-16" },
          ].map((row, idx) => (
            <div key={idx} className="flex justify-between">
              <Skeleton className={`h-4 ${row.left}`} />
              <Skeleton className={`h-4 ${row.right}`} />
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-7 w-24" />
          </div>
        </div>

        {/* Checkout Button */}
        <Skeleton className="h-12 w-full rounded-lg mt-4" />

        {/* Payment methods */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <Skeleton className="h-3 w-32 mb-3" />
          <div className="flex gap-2">
            <Skeleton className="flex-1 h-10 rounded" />
            <Skeleton className="flex-1 h-10 rounded" />
            <Skeleton className="flex-1 h-10 rounded" />
          </div>
        </div>

        {/* Continue button */}
        <Skeleton className="h-10 w-full rounded-lg" />
      </CardContent>
    </Card>
  );
}

export default function CartSkeleton({ itemsCount = 3 }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-16 ml-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {Array.from({ length: itemsCount }).map((_, idx) => (
              <CartItemSkeleton key={idx} />
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <OrderSummarySkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
