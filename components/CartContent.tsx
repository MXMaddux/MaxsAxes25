"use client";

import React from "react";
import Link from "next/link";
import CartColumns from "./CartColumns";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";
import { useCartContext } from "@/store/cart_context";

interface CartItemProps {
  _id: string; // Use _id consistently
  image: string;
  model: string;
  price: number;
  amount: number;
}

const CartContent = () => {
  const { cart, clearCart } = useCartContext();
  console.log("Cart State in CartContent:", cart);

  return (
    <section className="py-20 bg-blue-900 h-full">
      <div className="w-[90vw] max-w-[1170px] mx-auto px-4">
        <CartColumns />
        {cart.map((item) => (
          <CartItem key={item._id} {...item} />
        ))}
        <hr className="my-8 border-gray-300" />
        <div className="flex justify-between mt-8">
          <Link
            href="/axes"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Continue Shopping
          </Link>
          <button
            type="button"
            className="inline-block bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200"
            onClick={clearCart}
          >
            Clear Shopping Cart
          </button>
        </div>
        <CartTotals />
      </div>
    </section>
  );
};

export default CartContent;
