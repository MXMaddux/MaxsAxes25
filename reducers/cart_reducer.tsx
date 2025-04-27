// Define action types as enum for better type safety
export enum CartActionTypes {
  ADD_TO_CART = "ADD_TO_CART",
  CLEAR_CART = "CLEAR_CART",
  COUNT_CART_TOTALS = "COUNT_CART_TOTALS",
  REMOVE_CART_ITEM = "REMOVE_CART_ITEM",
  TOGGLE_CART_ITEM_AMOUNT = "TOGGLE_CART_ITEM_AMOUNT",
  LOAD_CART = "LOAD_CART",
}

// Define action types as union type for better type safety
export type CartAction =
  | { type: CartActionTypes.ADD_TO_CART; payload: AddToCartPayload }
  | { type: CartActionTypes.REMOVE_CART_ITEM; payload: RemoveCartItemPayload }
  | {
      type: CartActionTypes.TOGGLE_CART_ITEM_AMOUNT;
      payload: ToggleCartItemAmountPayload;
    }
  | { type: CartActionTypes.LOAD_CART; payload: CartItem[] }
  | { type: CartActionTypes.CLEAR_CART }
  | { type: CartActionTypes.COUNT_CART_TOTALS };

// Define interfaces for your data structures
export interface Guitar {
  _id: string; // Updated to use _id
  model: string;
  brand: string;
  image: string;
  price: number;
  stock: number;
}

export interface CartItem {
  _id: string; // Updated to use _id
  model: string;
  brand: string;
  image: string;
  price: number;
  amount: number;
  max: number;
}

export interface CartState {
  cart: CartItem[];
  total_items: number; // Non-optional
  total_amount: number; // Non-optional
  shipping_fee: number; // Non-optional
}

// Define action payload types
type AddToCartPayload = {
  _id: string; // Updated to use _id
  amount: number;
  shipping_fee: number;
  guitar: Guitar;
};

type RemoveCartItemPayload = string; // just the _id

type ToggleCartItemAmountPayload = {
  _id: string; // Updated to use _id
  value: "inc" | "dec";
};

// Initial state with proper typing
export const initialCartState: CartState = {
  cart: [],
  total_items: 0,
  total_amount: 0,
  shipping_fee: 553499, // Default shipping fee
};

// Cart Reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART: {
      const { _id, amount, guitar } = action.payload; // Updated to use _id
      console.log("Adding item with _id:", _id);
      console.log("Current Cart Before Addition:", state.cart);
      const tempItem = state.cart.find((i) => i._id === _id); // Updated to use _id

      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem._id === _id) {
            // Updated to use _id
            let newAmount = cartItem.amount + amount;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            return { ...cartItem, amount: newAmount };
          }
          return cartItem;
        });
        console.log("Updated Cart After Incrementing Amount:", tempCart);
        return { ...state, cart: tempCart };
      }

      const newItem: CartItem = {
        _id, // Updated to use _id
        model: guitar.model,
        brand: guitar.brand,
        image: guitar.image,
        price: guitar.price,
        amount,
        max: guitar.stock,
      };
      console.log("New Item Added to Cart:", newItem);
      console.log("Updated Cart After Adding New Item:", [
        ...state.cart,
        newItem,
      ]);
      return { ...state, cart: [...state.cart, newItem] };
    }

    case CartActionTypes.REMOVE_CART_ITEM: {
      const tempCart = state.cart.filter((item) => item._id !== action.payload); // Updated to use _id
      return { ...state, cart: tempCart };
    }

    case CartActionTypes.TOGGLE_CART_ITEM_AMOUNT: {
      const { _id, value } = action.payload; // Updated to use _id
      const tempCart = state.cart.map((item) => {
        if (item._id === _id) {
          // Updated to use _id
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

    case CartActionTypes.CLEAR_CART: {
      return { ...state, cart: [] };
    }

    case CartActionTypes.COUNT_CART_TOTALS: {
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

    case CartActionTypes.LOAD_CART: {
      return { ...state, cart: action.payload };
    }

    default: {
      // Handle unhandled actions
      const _exhaustiveCheck: never = action;
      throw new Error(`Unhandled action type: ${JSON.stringify(action)}`);
    }
  }
};

export default cartReducer;
