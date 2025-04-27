"use client";

import React, { useEffect, useContext, useReducer } from "react";
import cartReducer, {
  CartState as ReducerCartState,
  CartActionTypes,
  initialCartState,
} from "@/reducers/cart_reducer";
import { Guitar } from "@/reducers/cart_reducer";

interface CartContextValue extends ReducerCartState {
  addToCart: (
    _id: string, // Updated to use _id
    amount: number,
    shipping_fee: number,
    guitar: Guitar
  ) => void;
  removeItem: (_id: string) => void; // Updated to use _id
  toggleAmount: (_id: string, value: "inc" | "dec") => void; // Updated to use _id
  clearCart: () => void;
}

const CartContext = React.createContext<CartContextValue | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    const parsedCart = cart ? JSON.parse(cart) : [];
    console.log("Loaded Cart from localStorage:", parsedCart);
    dispatch({
      type: CartActionTypes.LOAD_CART,
      payload: parsedCart,
    });
  }, []);

  useEffect(() => {
    if (state.cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    }
    dispatch({ type: CartActionTypes.COUNT_CART_TOTALS });
  }, [state.cart]);

  const addToCart = (
    _id: string, // Updated to use _id
    amount: number,
    shipping_fee: number,
    guitar: Guitar
  ) => {
    dispatch({
      type: CartActionTypes.ADD_TO_CART,
      payload: { _id, amount, shipping_fee, guitar },
    });
  };

  const removeItem = (_id: string) => {
    // Updated to use _id
    dispatch({ type: CartActionTypes.REMOVE_CART_ITEM, payload: _id });
  };

  const toggleAmount = (_id: string, value: "inc" | "dec") => {
    // Updated to use _id
    dispatch({
      type: CartActionTypes.TOGGLE_CART_ITEM_AMOUNT,
      payload: { _id, value },
    });
  };

  const clearCart = () => {
    dispatch({ type: CartActionTypes.CLEAR_CART });
  };

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, clearCart, toggleAmount, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = (): CartContextValue => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
