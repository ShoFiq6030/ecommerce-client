import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Heart, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ProductImgGallery from "@/src/components/productsDetailsPage/ProductImgGallery";
import ProductAction from "@/src/components/productsDetailsPage/ProductAction";

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  // Fetch product data
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Product not found
          </h2>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const data = await res.json();
  const product = data.product;

  // Mock reviews data 
  const reviews = {
    average: 4.5,
    count: 128,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <ProductImgGallery product={product} />

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {product.name}
                </h1>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors"
                  >
                    <Heart size={20} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-500 transition-colors"
                  >
                    <Share2 size={20} />
                  </Button>
                </div>
              </div>

              {/* Category & SKU */}
              <div className="flex items-center gap-3 mt-2">
                {product.categoryId && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {product.categoryId.name}
                  </Badge>
                )}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  SKU: {product.sku}
                </span>
              </div>
            </div>

            {/* Price & Rating */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.discountId && (
                    <span className="text-lg text-gray-400 line-through">
                      ${(product.price * 1.2).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${i < Math.floor(reviews.average)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({reviews.count} reviews)
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-gray dark:prose-invert">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {product.desc}
              </p>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4 bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
              {product.size && (
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Size</span>
                  <p className="font-semibold text-gray-900 dark:text-white">{product.size}</p>
                </div>
              )}
              {product.color && (
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Color</span>
                  <p className="font-semibold text-gray-900 dark:text-white">{product.color}</p>
                </div>
              )}
              {product.weight && (
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Weight</span>
                  <p className="font-semibold text-gray-900 dark:text-white">{product.weight}</p>
                </div>
              )}
              {product.inventoryCount !== undefined && (
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Stock</span>
                  <p className={`font-semibold ${product.inventoryCount > 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                    }`}>
                    {product.inventoryCount > 0
                      ? `In Stock (${product.inventoryCount})`
                      : 'Out of Stock'
                    }
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <ProductAction product={product} />

            {/* Additional Info */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Free Shipping
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  30-Day Returns
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  2-Year Warranty
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Placeholder for related products */}
            {[1, 2, 3, 4].map((item) => (
              <Card
                key={item}
                className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-t-xl" />
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                    Related Product {item}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="pt-0">
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    ${(99 + item * 50).toFixed(2)}
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
