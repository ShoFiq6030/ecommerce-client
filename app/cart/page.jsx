"use client";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  CreditCard,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CartSkeleton from "@/src/components/common/CartSkeleton";

export default function CartPage() {
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);

  // Get cart data from cache
  const { data: cartData, isLoading } = useQuery({
    queryKey: ["cartItems"],
    staleTime: 0,
  });

  const cartSession = cartData?.session || {};
  const items = cartSession.items || [];
  const total = cartSession.total || 0;

  // Mutation for updating quantity
  const updateQuantityMutation = useMutation({
    mutationFn: async ({ itemId, quantity }) => {
      // API call to update quantity
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, quantity }),
      });
      return response.json();
    },
    onMutate: () => setIsUpdating(true),
    onSuccess: () => {
      queryClient.invalidateQueries(["cartItems"]);
    },
    onSettled: () => setIsUpdating(false),
  });

  // Mutation for removing item
  const removeItemMutation = useMutation({
    mutationFn: async (itemId) => {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cartItems"]);
    },
  });

  // Mutation for checkout
  const checkoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: cartSession._id }),
      });
      return response.json();
    },
    onSuccess: (data) => {
      // Redirect to checkout page
      window.location.href = data.checkoutUrl || "/checkout";
    },
  });

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantityMutation.mutate({ itemId, quantity: newQuantity });
  };

  const handleRemoveItem = (itemId) => {
    removeItemMutation.mutate(itemId);
  };

  const handleCheckout = () => {
    checkoutMutation.mutate();
  };

  // Show loader while loading cart data
  if (isLoading) {
    return <CartSkeleton />;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center p-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-10 h-10 text-gray-500 dark:text-gray-400" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Your cart is empty
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400">
              Add some products to your cart to get started
            </p>
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Shopping Cart
          </h1>
          <Badge variant="secondary" className="ml-2 text-sm">
            {items.length} items
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                      {item.productId.images && item.productId.images[0] ? (
                        <Image
                          src={item.productId.images[0]}
                          alt={item.productId.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 96px) 96px, 96px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                            {item.productId.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            SKU: {item.productId.sku}
                          </p>
                          {item.size && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Size: {item.size}
                            </p>
                          )}
                          {item.color && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Color: {item.color}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          disabled={isUpdating}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            disabled={isUpdating || item.quantity <= 1}
                            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-medium text-gray-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            disabled={isUpdating}
                            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">
                            ${(item.unitPrice * item.quantity).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            ${item.unitPrice.toLocaleString()} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Subtotal</span>
                  <span>${total.toLocaleString()}</span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Shipping</span>
                  <span className="text-green-600 dark:text-green-400">
                    Free
                  </span>
                </div>

                {/* Tax */}
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Tax (Estimated)</span>
                  <span>${Math.round(total * 0.1).toLocaleString()}</span>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      ${(total + Math.round(total * 0.1)).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button
                  className="w-full h-12 text-lg font-semibold mt-4"
                  onClick={handleCheckout}
                  disabled={checkoutMutation.isPending}
                >
                  {checkoutMutation.isPending ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Proceed to Checkout
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </Button>

                {/* Payment Methods */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Accepted Payment Methods
                  </p>
                  <div className="flex gap-2">
                    <div className="flex-1 h-10 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                        VISA
                      </span>
                    </div>
                    <div className="flex-1 h-10 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                        MC
                      </span>
                    </div>
                    <div className="flex-1 h-10 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                        AMEX
                      </span>
                    </div>
                  </div>
                </div>

                {/* Continue Shopping */}
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/">Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
