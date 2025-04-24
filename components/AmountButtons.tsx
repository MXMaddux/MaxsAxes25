import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

interface AmountButtonsProps {
  increase: () => void;
  decrease: () => void;
  amount: number;
}

const AmountButtons: React.FC<AmountButtonsProps> = ({
  increase,
  decrease,
  amount,
}) => {
  return (
    <div className="grid w-[140px] grid-cols-3 items-center justify-items-center">
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center border-none bg-transparent p-0 text-white hover:text-gray-300 focus:outline-none"
        onClick={decrease}
        aria-label="Decrease quantity"
      >
        <FaMinus className="text-lg" />
      </button>

      <h2 className="m-0 text-white">{amount}</h2>

      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center border-none bg-transparent p-0 text-white hover:text-gray-300 focus:outline-none"
        onClick={increase}
        aria-label="Increase quantity"
      >
        <FaPlus className="text-lg" />
      </button>
    </div>
  );
};

export default AmountButtons;
