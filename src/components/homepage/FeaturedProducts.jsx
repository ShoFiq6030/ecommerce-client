import React from "react";
import ProductCard from "@/src/components/products/ProductCard";

async function getFeaturedProducts() {
  try {
    const url = new URL(`${process.env.API_URL}/products`);
    const res = await fetch(url.toString(), {
      cache: "no-store",
    });
    const data = await res.json();
    // Get first 3 products as featured
    return (data.products || []).slice(0, 3);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

export default async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Featured Products
        </h2>
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No featured products available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}