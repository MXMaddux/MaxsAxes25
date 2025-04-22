import { ActionTypes } from "@/actions";

// Define action types as enum for better type safety
export enum CartActionTypes {
  ADD_TO_CART = "ADD_TO_CART",
  CLEAR_CART = "CLEAR_CART",
  COUNT_CART_TOTALS = "COUNT_CART_TOTALS",
  REMOVE_CART_ITEM = "REMOVE_CART_ITEM",
  TOGGLE_CART_ITEM_AMOUNT = "TOGGLE_CART_ITEM_AMOUNT",
}

// Define action types as enum for better type safety
export type CartAction =
  | { type: ActionTypes.ADD_TO_CART; payload: AddToCartPayload }
  | { type: ActionTypes.REMOVE_CART_ITEM; payload: RemoveCartItemPayload }
  | {
      type: ActionTypes.TOGGLE_CART_ITEM_AMOUNT;
      payload: ToggleCartItemAmountPayload;
    }
  | { type: ActionTypes.LOAD_CART; payload: CartItem[] }
  | { type: ActionTypes.CLEAR_CART }
  | { type: ActionTypes.COUNT_CART_TOTALS };

// Define interfaces for your data structures
export interface Guitar {
  id: string;
  model: string;
  brand: string;
  image: string;
  price: number;
  stock: number;
}

export interface CartItem {
  id: string;
  model: string;
  brand: string;
  image: string;
  price: number;
  amount: number;
  max: number;
}

export interface CartState {
  cart: CartItem[];
  total_items?: number;
  total_amount?: number;
  shipping_fee: number;
}

// Define action payload types
type AddToCartPayload = {
  id: string;
  amount: number;
  shipping_fee: number;
  guitar: Guitar;
};

type RemoveCartItemPayload = string; // just the ID

type ToggleCartItemAmountPayload = {
  id: string;
  value: "inc" | "dec";
};

// Initial state with proper typing
export const initialCartState: CartState = {
  cart: [],
  total_items: 0,
  total_amount: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART: {
      const { id, amount, guitar } = action.payload;
      const tempItem = state.cart.find((i) => i.id === id);

      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id) {
            let newAmount = cartItem.amount + amount;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            return { ...cartItem, amount: newAmount };
          }
          return cartItem;
        });
        return { ...state, cart: tempCart };
      }

      const newItem: CartItem = {
        id,
        model: guitar.model,
        brand: guitar.brand,
        image: guitar.image,
        price: guitar.price,
        amount,
        max: guitar.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }

    case ActionTypes.REMOVE_CART_ITEM: {
      const tempCart = state.cart.filter((item) => item.id !== action.payload);
      return { ...state, cart: tempCart };
    }

    case ActionTypes.TOGGLE_CART_ITEM_AMOUNT: {
      const { id, value } = action.payload;
      const tempCart = state.cart.map((item) => {
        if (item.id === id) {
          let newAmount = item.amount;
          if (value === "inc") {
            newAmount = item.amount + 1;
            if (newAmount > item.max) {
              newAmount = item.max;
            }
          } else if (value === "dec") {
            newAmount = item.amount - 1;
            if (newAmount <= 0) {
              newAmount = 0;
            }
          }
          return { ...item, amount: newAmount };
        }
        return item;
      });
      return { ...state, cart: tempCart };
    }

    case ActionTypes.CLEAR_CART: {
      return { ...state, cart: [] };
    }

    case ActionTypes.COUNT_CART_TOTALS: {
      const { total_items, total_amount } = state.cart.reduce(
        (total, cartItem) => {
          const { amount, price } = cartItem;
          total.total_items += amount;
          total.total_amount += price * amount;
          return total;
        },
        { total_items: 0, total_amount: 0 }
      );
      return { ...state, total_items, total_amount };
    }
    case ActionTypes.LOAD_CART:
      return { ...state, cart: action.payload };

    default:
      const exhaustiveCheck: never = action;
      throw new Error(`Unhandled action type: ${exhaustiveCheck}`);
  }
};

export default cartReducer;
