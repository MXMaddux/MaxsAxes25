"use client";

import React from "react";
import { FaTrash } from "react-icons/fa";
import AmountButtons from "./AmountButtons";
import { useCartContext } from "@/store/cart_context";
import { formatPrice } from "@/utils/helpers";
import Image from "next/image";

interface CartItemProps {
  _id: string;
  image: string;
  model: string;
  price: number;
  amount: number;
}

const CartItem: React.FC<CartItemProps> = ({
  _id,
  image,
  model,
  price,
  amount,
}) => {
  const { removeItem, toggleAmount } = useCartContext();

  const increase = () => {
    toggleAmount(_id, "inc");
  };

  const decrease = () => {
    toggleAmount(_id, "dec");
  };

  return (
    <article className="grid grid-cols-[316px_1fr_1fr_1fr_auto] gap-4 justify-items-centeritems-center mb-8">
      {/* Item Column */}
      <div className="flex items-center gap-4">
        <Image
          src={image}
          alt={model}
          width={80}
          height={80}
          className="w-20 h-20 object-cover rounded-md"
        />
        <div>
          <h5 className="text-sm font-medium text-gray-300">{model}</h5>
          <h5 className="text-xs text-blue-300">{formatPrice(price)}</h5>
        </div>
      </div>

      {/* Price Column */}
      <h5 className="text-sm font-medium text-blue-300 ">
        {formatPrice(price)}
      </h5>

      {/* Quantity Column */}
      <AmountButtons amount={amount} increase={increase} decrease={decrease} />

      {/* Subtotal Column */}
      <h5 className="text-sm font-medium text-blue-300 ">
        {formatPrice(price * amount)}
      </h5>

      {/* Remove Button Column */}
      <button
        className="text-white bg-red-600 p-2 rounded-md hover:bg-red-700 transition-colors w-8 h-8 flex items-center justify-center"
        onClick={() => removeItem(_id)}
      >
        <FaTrash className="text-sm" />
      </button>
    </article>
  );
};

export default CartItem;
