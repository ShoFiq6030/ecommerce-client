import React from "react";
import Link from "next/link";
import Image from "next/image";
import AddToCart from "./AddToCart";
import ProductAction from "../productsDetailsPage/ProductAction";

export default function ProductCard({ product }) {
  return (
    <div className="group block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
        {product.images && product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Badge - Optional */}
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            NEW
          </span>
        )}

        {product.isFeatured && (
          <span className="absolute top-2 right-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            FEATURED
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        {product.category && (
          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium capitalize">
            {product.category}
          </span>
        )}

        {/* Product Name */}
        <Link
          href={`/products/${product._id}`}
          className="mt-1 text-gray-900 hover:underline dark:text-white font-semibold text-sm line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
        >
          {product.name}
        </Link>

        {/* Description */}
        {product.description && (
          <p className="mt-1 text-gray-600 dark:text-gray-400 text-xs line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ${product.price?.toFixed(2) || "0.00"}
          </span>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center space-x-1">
              <svg
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {product.rating}
              </span>
            </div>
          )}
        </div>

        {/* Stock Status */}
        {product.stock !== undefined && (
          <div className="mt-2">
            {product.stock > 0 ? (
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                In Stock ({product.stock})
              </span>
            ) : (
              <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                Out of Stock
              </span>
            )}
          </div>
        )}

        {/* Add to Cart Button */}
        <ProductAction product={product} />
        {/* <AddToCart  /> */}
      </div>

      {/* Hover Overlay */}
      {/* <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div> */}
    </div>
  );
}
