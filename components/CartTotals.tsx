"use client"; // Mark as a client component

import React from "react";
import Link from "next/link";
import { useCartContext } from "@/store/cart_context";
import { useUserContext } from "@/store/user_context";
import { formatPrice } from "@/utils/helpers";

const CartTotals = () => {
  const { total_amount, shipping_fee } = useCartContext();
  const { myUser, loginWithRedirect } = useUserContext();

  return (
    <section className="mt-8 flex justify-center md:justify-end">
      <div className="border border-gray-200 rounded-lg p-6 w-full max-w-sm">
        {/* Subtotal */}
        <div className="grid grid-cols-[200px_1fr] gap-2 mb-4">
          <h5 className="text-gray-700 font-medium">Subtotal:</h5>
          <span className="text-blue-600">{formatPrice(total_amount)}</span>
        </div>

        {/* Shipping Fee */}
        <div className="grid grid-cols-[200px_1fr] gap-2 mb-6">
          <p className="text-gray-500 text-sm capitalize">Shipping Fee:</p>
          <span className="text-gray-400">{formatPrice(shipping_fee)}</span>
        </div>

        <hr className="border-gray-300 my-4" />

        {/* Order Total */}
        <div className="grid grid-cols-[200px_1fr] gap-2 mb-6">
          <h4 className="text-gray-700 font-bold">Order Total:</h4>
          <span className="text-blue-600 font-bold">
            {formatPrice(total_amount + shipping_fee)}
          </span>
        </div>

        {/* Button */}
        {myUser ? (
          <Link
            href="/checkout"
            className="block w-full bg-blue-600 text-white py-3 rounded-md text-center font-bold hover:bg-blue-700 transition-colors"
          >
            Proceed to Checkout
          </Link>
        ) : (
          <button
            onClick={loginWithRedirect}
            className="block w-full bg-blue-600 text-white py-3 rounded-md text-center font-bold hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        )}
      </div>
    </section>
  );
};

export default CartTotals;
