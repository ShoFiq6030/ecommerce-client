import { CarouselPlugin } from "@/src/components/homepage/heroCarousel";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import FeaturedProducts from "@/src/components/homepage/FeaturedProducts";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-blue-400 via-purple-600 to-pink-500 text-white py-2">
        <Marquee gradient={false} speed={40}>
          <span className="mx-8 flex items-center gap-2 text-sm sm:text-base font-medium">
            <span className="text-yellow-300">🔥</span> Use promo code{" "}
            <span className="font-bold bg-white/20 px-2 py-0.5 rounded">
              SCIC2026
            </span>{" "}
            for 10% off on all items!
          </span>
          <span className="mx-8 flex items-center gap-2 text-sm sm:text-base font-medium">
            <span className="text-yellow-300">🚚</span> Free shipping on orders
            over $100
          </span>
          <span className="mx-8 flex items-center gap-2 text-sm sm:text-base font-medium">
            <span className="text-yellow-300">↩️</span> 30-day easy returns
          </span>
        </Marquee>
      </div>

      {/* Modern Hero Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Carousel - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <CarouselPlugin />
          </div>

          {/* Side Ads - Modern Card Design */}
          <div className="flex  flex-col justify-center items-center gap-4 lg:gap-6 lg:col-span-1">
            <div className="relative group lg:h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 h-48  flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="relative z-10 text-center p-4">
                <div className="text-4xl md:text-5xl mb-2">⚡</div>
                <Link
                  href="/products"
                 className="text-white font-bold text-lg md:text-xl">
                  Flash Deals
                </Link>
                <p className="text-blue-100 text-sm md:text-base mt-1">
                  Limited time offers
                </p>
                <span className="inline-block mt-3 px-4 py-1.5 bg-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/30 transition-colors">
                  View Deals →
                </span>
              </div>
            </div>

            <div className="relative group lg:h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 h-48  flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="relative z-10 text-center p-4">
                <div className="text-4xl md:text-5xl mb-2">🎁</div>
                <h3 className="text-white font-bold text-lg md:text-xl">
                  New User
                </h3>
                <p className="text-purple-100 text-sm md:text-base mt-1">
                  Special welcome offer
                </p>
                <span className="inline-block mt-3 px-4 py-1.5 bg-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/30 transition-colors">
                  Claim Now →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Categories Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Browse Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Electronics", "Fashion", "Furniture", "Sports"].map(
              (category) => (
                <div
                  key={category}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="text-4xl mb-3">📦</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {category}
                  </h3>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Quality</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Amazing quality!", "Fast shipping!", "Great service!"].map(
              (testimonial, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
                >
                  <div className="text-yellow-400 mb-3">★★★★★</div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {'"' + testimonial + '"'}
                  </p>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    Customer {idx + 1}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-3">🚚</div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Free Shipping
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                On orders over $100
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">↩️</div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Easy Returns
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                30-day return policy
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Secure Payment
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                100% secure checkout
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Best Quality
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Premium products only
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of satisfied customers today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Create Account
            </Link>
            <Link
              href="/login"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/products"
              className="bg-purple-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-900 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
