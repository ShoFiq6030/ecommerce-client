"use client"
import Image from "next/image";
import React, { useState } from "react";

export default function ProductImgGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div>
      {" "}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-square bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image Available
            </div>
          )}
        </div>

        {/* Thumbnail Gallery */}
        {product.images && product.images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-12 h-10 md:w-20 md:h-20 flex-shrink-0 bg-white dark:bg-gray-800 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                  selectedImage === index
                    ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-50"
                    : "border-transparent hover:border-blue-500"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} - ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
