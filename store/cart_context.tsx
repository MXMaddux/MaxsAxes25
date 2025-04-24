// cart_context.tsx
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
    id: string,
    amount: number,
    shipping_fee: number,
    guitar: Guitar
  ) => void;
  removeItem: (id: string) => void;
  toggleAmount: (id: string, value: "inc" | "dec") => void;
  clearCart: () => void;
}

const CartContext = React.createContext<CartContextValue | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    dispatch({
      type: CartActionTypes.LOAD_CART,
      payload: cart ? JSON.parse(cart) : [],
    });
  }, []);

  useEffect(() => {
    if (state.cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    }
    dispatch({ type: CartActionTypes.COUNT_CART_TOTALS });
  }, [state.cart]);

  const addToCart = (
    id: string,
    amount: number,
    shipping_fee: number,
    guitar: Guitar
  ) => {
    dispatch({
      type: CartActionTypes.ADD_TO_CART,
      payload: { id, amount, shipping_fee, guitar },
    });
  };

  const removeItem = (id: string) => {
    dispatch({ type: CartActionTypes.REMOVE_CART_ITEM, payload: id });
  };

  const toggleAmount = (id: string, value: "inc" | "dec") => {
    dispatch({
      type: CartActionTypes.TOGGLE_CART_ITEM_AMOUNT,
      payload: { id, value },
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
