"use client"; // Mark as a client component

import React from "react";
import Link from "next/link";
import CartContent from "@/components/CartContent";
import { useCartContext } from "@/store/cart_context";

const CartPage = () => {
  const { cart } = useCartContext();

  if (cart.length < 1) {
    return (
      <main className="min-h-[calc(100vh-13rem)] h-full bg-blue-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Your cart is empty
          </h2>
          <Link
            href="/axes"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Fill it
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-(20vh+10rem))] py-20 bg-blue-900">
      <CartContent />
    </main>
  );
};

export default CartPage;
