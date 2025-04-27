"use client"; // Mark as a client component

import React, { useState, useEffect } from "react";
import { useCartContext } from "@/store/cart_context";
import { useUserContext } from "@/store/user_context";
import { useRouter } from "next/navigation";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElementChangeEvent } from "@stripe/stripe-js";

import axios from "axios";
import { formatPrice } from "@/utils/helpers";

const CheckoutForm = () => {
  const { cart, total_amount, shipping_fee, clearCart } = useCartContext();
  const { myUser } = useUserContext();
  const router = useRouter();

  // State variables
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  // Stripe hooks
  const stripe = useStripe(); // Requires <Elements> provider
  const elements = useElements(); // Requires <Elements> provider

  // Create Payment Intent on component mount
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const { data } = await axios.post("/api/create-payment-intent", {
          cart,
          shipping_fee,
          total_amount,
        });
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error("Error creating payment intent:", err);
        setError("Failed to initialize payment. Please try again later.");
      }
    };

    if (cart.length > 0) {
      createPaymentIntent();
    }
  }, [cart, shipping_fee, total_amount]);

  // Handle changes in the CardElement
  const handleChange = (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : null);
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (payload.error) {
        setError(`Payment failed: ${payload.error.message}`);
      } else {
        setError(null);
        setSucceeded(true);

        setTimeout(() => {
          clearCart();
          router.push("/");
        }, 10000); // Redirect after 10 seconds
      }
    } catch (err) {
      console.error("Error processing payment:", err);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      {/* Success Message */}
      {succeeded ? (
        <article className="text-center space-y-4">
          <h4 className="text-xl font-bold text-white">Thank you!</h4>
          <h4 className="text-lg text-blue-300">
            Your payment was successful.
          </h4>
          <h4 className="text-sm text-gray-400">
            Redirecting to home page shortly...
          </h4>
        </article>
      ) : (
        <article className="space-y-4">
          <h4 className="text-lg text-white">Hello, {myUser?.name}</h4>
          <p className="text-gray-400">
            Your total is {formatPrice(shipping_fee + total_amount)}
          </p>
          <p className="text-gray-400">
            Test Card Number:{" "}
            <span className="font-mono">4242 4242 4242 4242</span>
          </p>

          {/* Payment Form */}
          <form
            id="payment-form"
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >
            {/* Card Element */}
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#ced2f0",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
              onChange={handleChange}
            />

            {/* Submit Button */}
            <button
              disabled={processing || disabled || succeeded}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              <span id="button-text">
                {processing ? (
                  <div className="animate-spin h-5 w-5 border-4 border-t-4 border-white rounded-full" />
                ) : (
                  "Pay"
                )}
              </span>
            </button>

            {/* Error Message */}
            {error && (
              <div
                className="text-red-500 text-center text-sm mt-2"
                role="alert"
              >
                {error}
              </div>
            )}

            {/* Success Message */}
            <p
              className={`${
                succeeded ? "block" : "hidden"
              } text-green-500 text-center text-sm mt-2`}
            >
              Payment succeeded. See the result in your{" "}
              <a
                href="https://dashboard.stripe.com/test/payments"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-400"
              >
                Stripe dashboard.
              </a>{" "}
              Refresh the page to pay again.
            </p>
          </form>
        </article>
      )}
    </div>
  );
};

export default CheckoutForm;
