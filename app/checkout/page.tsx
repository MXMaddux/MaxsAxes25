"use client"; // Mark as a client component

import React from "react";
import { useCartContext } from "@/store/cart_context";
import Link from "next/link";
import StripeCheckout from "@/components/StripeCheckout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutPage = () => {
  const { cart } = useCartContext();
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-900">
      {cart.length < 1 ? (
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold text-blue-200">
            Your cart is empty
          </h2>
          <Link
            href="/axes"
            className="inline-block px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out"
          >
            Fill it
          </Link>
        </div>
      ) : (
        <Elements stripe={stripePromise}>
          <StripeCheckout />
        </Elements>
      )}
    </main>
  );
};

export default CheckoutPage;
