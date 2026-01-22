"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function ProductAction({ product }) {
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();
  const userId = session?.user?.user?._id;

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "user-id": userId },
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to add to cart");
      return res.json();
    },

    onSuccess: () => {
      toast.success("Added to cart");
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },

    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const cartItems = queryClient.getQueryData(["cartItems"]);
  console.log(cartItems?.session?.items);

  const isInCart = cartItems?.session?.items?.some(
    (item) => item._id === product._id,
  );
  console.log(isInCart);
  console.log(product);
  return (
    <div className="flex gap-4 pt-4">
      <Button
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending || product.inventoryCount === 0}
        size="lg"
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
      >
        {mutation.isPending ? (
          <>
            <div className="spi flex items-center justify-center">
              <div className="h-6 w-6 rounded-full border-2 border-white border-t-transparent animate-spin" />
            </div>
            <span className="ml-2">Adding...</span>
          </>
        ) : isInCart ? (
          <p>Already added</p>
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
