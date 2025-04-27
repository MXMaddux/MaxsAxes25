"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCartContext } from "@/store/cart_context";
import AmountButtons from "@/components/AmountButtons";
import { Guitar } from "@/reducers/cart_reducer";

interface AddToCartProps {
  guitar: Guitar;
}

const AddToCart: React.FC<AddToCartProps> = ({ guitar }) => {
  const { addToCart } = useCartContext();
  const { _id, stock } = guitar; // Updated to use _id
  const [amount, setAmount] = useState(0);

  const increase = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount + 1;
      if (tempAmount > stock) {
        tempAmount = stock;
      }
      return tempAmount;
    });
  };

  const decrease = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1;
      if (tempAmount < 0) {
        tempAmount = 0;
      }
      return tempAmount;
    });
  };

  return (
    <div className="mt-8">
      {/* Amount Buttons */}
      <div className="flex items-center space-x-4">
        <AmountButtons
          increase={increase}
          decrease={decrease}
          amount={amount}
        />
        <Link
          href="/cart"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
          onClick={() => addToCart(_id, amount, 553499, guitar)} // Updated to use _id
        >
          Add to Cart
        </Link>
      </div>
    </div>
  );
};

export default AddToCart;
