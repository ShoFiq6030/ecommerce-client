"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function ProductAction({ product }) {
  const queryClient = useQueryClient();
//  console.log(product);

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
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

 const { data } = useQuery({
    queryKey: ["cartItems"],
    queryFn: async () => {
      const res = await fetch("/api/cart");
      return res.json();
    },
  });
  const cartItems = data?.session?.items || [];


 const isItemInCart = cartItems.some(item => item.productId._id === product._id);
;
  console.log(isItemInCart);
  // console.log(product);
  return (
    <div className="flex gap-4 pt-4">
      <Button
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending || product.inventoryCount === 0 || isItemInCart}
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
        ) : isItemInCart ? (
          <p>Already in Cart</p>
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
