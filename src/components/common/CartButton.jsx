"use client";
import { ShoppingCart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CartButton() {
  const { data: session, status } = useSession();
  const userId = session?.user?.user?._id;
  console.log(userId);
  const { data } = useQuery({
    queryKey: ["cartItems"],
    queryFn: async () => {
      const res = await fetch("/api/cart");
      return res.json();
    },
  });
  const cartItems = data?.session?.items || [];
  return (
    <Link
      href="/cart"
     className="relative p-4">
      {" "}
      <ShoppingCart className=" text-white hover:text-blue-200 cursor-pointer"></ShoppingCart>
      <div className="z-200 bg-red-200 absolute top-1 right-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
        <p>{cartItems?.length}</p>
      </div>
    </Link>
  );
}
