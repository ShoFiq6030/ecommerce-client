"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProductAction({ product }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session, status } = useSession();

  // Read cart
  const { data, isLoading: cartLoading } = useQuery({
    queryKey: ["cartItems"],
    queryFn: async () => {
      const res = await fetch("/api/cart");
      return res.json();
    },
    enabled: status === "authenticated",
  });

  const cartItems = data?.session?.items || [];

  const isItemInCart = cartItems.some(
    (item) => item.productId?._id === product?._id,
  );

  // Mutation (MUST be at top-level)
  const mutation = useMutation({
    mutationFn: async () => {
      if (!session) {
        throw new Error("UNAUTHORIZED");
      }

      const res = await fetch(`/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
      });

      if (res.status === 401) throw new Error("UNAUTHORIZED");
      if (!res.ok) throw new Error("FAILED");

      return res.json();
    },

    onSuccess: () => {
      toast.success("Added to cart");
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },

    onError: (err) => {
      if (err?.message === "UNAUTHORIZED") {
        toast.error("Please log in....!");
        router.push(`/login?callbackUrl=/products/${product._id}`);
        return;
      }
      toast.error("Something went wrong");
    },
  });

  const handleAddToCart = () => {
    // if (!session) {
    //   router.push(`/login?callbackUrl=/products/${product._id}`);
    //   // toast.error("Please login....!");
    //   return;
    // }
    mutation.mutate();
  };

  return (
    <div className="flex gap-4 pt-4">
      <Button
        onClick={handleAddToCart}
        disabled={
          mutation.isPending ||
          product?.inventoryCount === 0 ||
          isItemInCart ||
          cartLoading
        }
        size="lg"
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
      >
        {mutation.isPending ? (
          <>
            <div className="flex items-center justify-center">
              <div className="h-6 w-6 rounded-full border-2 border-white border-t-transparent animate-spin" />
            </div>
            <span className="ml-2">Adding...</span>
          </>
        ) : isItemInCart ? (
          "Already in Cart"
        ) : (
          <>
            <ShoppingCart size={20} className="mr-2" />
            Add to Cart
          </>
        )}
      </Button>
    </div>
  );
}
