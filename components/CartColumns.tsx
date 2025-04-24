"use client"; // Mark as a client component if needed

import React from "react";

const CartColumns = () => {
  return (
    <div className="hidden md:block">
      {/* Grid Layout for Column Headers */}
      <div className="grid grid-cols-[316px_1fr_1fr_1fr_auto] gap-4 justify-items-center mb-4">
        <h5 className="text-sm font-medium text-gray-500">Item</h5>
        <h5 className="text-sm font-medium text-gray-500">Price</h5>
        <h5 className="text-sm font-medium text-gray-500">Quantity</h5>
        <h5 className="text-sm font-medium text-gray-500">Subtotal</h5>
        <span className="w-8 h-8"></span> {/* Empty span for alignment */}
      </div>

      {/* Horizontal Line */}
      <hr className="border-gray-300 mt-4 mb-12" />
    </div>
  );
};

export default CartColumns;
