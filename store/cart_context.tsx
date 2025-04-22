"use client";

import React, { useEffect, useContext, useReducer } from "react";
import reducer, {
  CartState as ReducerCartState,
} from "@/reducers/cart_reducer";
import { ActionTypes } from "@/actions";

interface CartState extends ReducerCartState {
  shipping_fee: number;
}

// Use the same Guitar interface from your reducer
interface Guitar {
  id: string;
  model: string;
  brand: string;
  image: string;
  price: number;
  stock: number;
}

// Use the same CartItem interface from your reducer
interface CartItem {
  id: string;
  model: string;
  brand: string;
  image: string;
  price: number;
  amount: number;
  max: number;
}

// Extend the reducer's state with additional context-specific properties
// interface CartState extends ReducerCartState {
//   cart: CartItem[];
//   total_items: number; // Changed from optional to required
//   total_amount: number; // Changed from optional to required
//   shipping_fee: number;
// }

interface CartContextValue extends CartState {
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

// const getLocalStorage = (): CartItem[] => {
//   const cart = localStorage.getItem("cart");
//   return cart ? JSON.parse(cart) : [];
// };

const CartContext = React.createContext<CartContextValue | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    cart: [],
    total_items: 0,
    total_amount: 0,
    shipping_fee: 553499,
  });

  // Initialize cart from localStorage
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    dispatch({
      type: ActionTypes.LOAD_CART,
      payload: cart ? JSON.parse(cart) : [],
    });
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    if (state.cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    }
    dispatch({ type: ActionTypes.COUNT_CART_TOTALS });
  }, [state.cart]);
  const addToCart = (
    id: string,
    amount: number,
    shipping_fee: number,
    guitar: Guitar
  ) => {
    dispatch({
      type: ActionTypes.ADD_TO_CART,
      payload: { id, amount, shipping_fee, guitar },
    });
  };

  const removeItem = (id: string) => {
    dispatch({ type: ActionTypes.REMOVE_CART_ITEM, payload: id });
  };

  const toggleAmount = (id: string, value: "inc" | "dec") => {
    dispatch({
      type: ActionTypes.TOGGLE_CART_ITEM_AMOUNT,
      payload: { id, value },
    });
  };

  const clearCart = () => {
    dispatch({ type: ActionTypes.CLEAR_CART });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
    dispatch({ type: ActionTypes.COUNT_CART_TOTALS });
  }, [state.cart]);

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
