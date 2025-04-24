// CartItem.tsx
"use client";

import React from "react";
import { FaTrash } from "react-icons/fa";
import AmountButtons from "./AmountButtons";
import { useCartContext } from "@/store/cart_context";
import { formatPrice } from "@/utils/helpers";
import Image from "next/image";

interface CartItemProps {
  id: string;
  image: string;
  model: string;
  price: number;
  amount: number;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  image,
  model,
  price,
  amount,
}) => {
  const { removeItem, toggleAmount } = useCartContext();

  const increase = () => {
    toggleAmount(id, "inc");
  };

  const decrease = () => {
    toggleAmount(id, "dec");
  };

  return (
    <article className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center mb-8">
      <div className="flex items-center gap-4">
        <Image
          src={image}
          alt={model}
          width={80}
          height={80}
          className="w-20 h-20 object-cover rounded-md"
        />
        <div>
          <h5 className="text-sm font-medium text-gray-700">{model}</h5>
          <h5 className="text-xs text-blue-600">{formatPrice(price)}</h5>
        </div>
      </div>
      <h5 className="hidden md:block text-sm font-medium text-blue-600">
        {formatPrice(price)}
      </h5>
      <AmountButtons amount={amount} increase={increase} decrease={decrease} />
      <h5 className="hidden md:block text-sm font-medium text-blue-600">
        {formatPrice(price * amount)}
      </h5>
      <button
        className="text-white bg-red-600 p-2 rounded-md hover:bg-red-700 transition-colors w-8 h-8 flex items-center justify-center"
        onClick={() => removeItem(id)}
      >
        <FaTrash className="text-sm" />
      </button>
    </article>
  );
};

export default CartItem;
