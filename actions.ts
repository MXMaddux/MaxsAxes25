// actions.ts
export enum ActionTypes {
  // Global UI actions
  SIDEBAR_OPEN = "SIDEBAR_OPEN",
  SIDEBAR_CLOSE = "SIDEBAR_CLOSE",
  SET_GRIDVIEW = "SET_GRIDVIEW",
  SET_LISTVIEW = "SET_LISTVIEW",

  // Guitar actions
  GET_GUITARS_BEGIN = "GET_GUITARS_BEGIN",
  GET_GUITARS_SUCCESS = "GET_GUITARS_SUCCESS",
  GET_GUITARS_ERROR = "GET_GUITARS_ERROR",
  GET_SINGLE_GUITAR_BEGIN = "GET_SINGLE_GUITAR_BEGIN",
  GET_SINGLE_GUITAR_SUCCESS = "GET_SINGLE_GUITAR_SUCCESS",
  GET_SINGLE_GUITAR_ERROR = "GET_SINGLE_GUITAR_ERROR",
  LOAD_GUITARS = "LOAD_GUITARS",

  // Sort/filter actions
  UPDATE_SORT = "UPDATE_SORT",
  SORT_GUITARS = "SORT_GUITARS",
  UPDATE_FILTERS = "UPDATE_FILTERS",
  FILTER_GUITARS = "FILTER_GUITARS",
  CLEAR_FILTERS = "CLEAR_FILTERS",

  // Cart actions
  ADD_TO_CART = "ADD_TO_CART",
  REMOVE_CART_ITEM = "REMOVE_CART_ITEM",
  TOGGLE_CART_ITEM_AMOUNT = "TOGGLE_CART_ITEM_AMOUNT",
  CLEAR_CART = "CLEAR_CART",
  COUNT_CART_TOTALS = "COUNT_CART_TOTALS",
  LOAD_CART = "LOAD_CART",
}

export interface Guitar {
  id: string;
  brand: string;
  model: string;
  description: string;
  image: string;
  price: number;
  stock: number;
}

export interface CartItem {
  id: string;
  amount: number;
  max: number;
  price: number;
  model: string;
  brand: string;
  image: string;
}

// Action payload types
export type GuitarsPayload = Guitar[];
export type SingleGuitarPayload = Guitar;
export type CartPayload = CartItem[];
export type UpdateCartPayload = { id: string; value: "inc" | "dec" };
export type SortPayload = string;
export type FilterPayload = {
  [key: string]: string | number | boolean;
};

// Union type for all actions
export type AppAction =
  // ui actions
  | { type: ActionTypes.SIDEBAR_OPEN }
  | { type: ActionTypes.SIDEBAR_CLOSE }
  | { type: ActionTypes.SET_GRIDVIEW }
  | { type: ActionTypes.SET_LISTVIEW }

  // Guitar Actions
  | { type: ActionTypes.GET_GUITARS_BEGIN }
  | { type: ActionTypes.GET_GUITARS_SUCCESS; payload: GuitarsPayload }
  | { type: ActionTypes.GET_GUITARS_ERROR }
  | { type: ActionTypes.GET_SINGLE_GUITAR_BEGIN }
  | {
      type: ActionTypes.GET_SINGLE_GUITAR_SUCCESS;
      payload: SingleGuitarPayload;
    }
  | { type: ActionTypes.GET_SINGLE_GUITAR_ERROR }
  | { type: ActionTypes.LOAD_GUITARS; payload: GuitarsPayload }

  // Sort/Filter Actions
  | { type: ActionTypes.UPDATE_SORT; payload: SortPayload }
  | { type: ActionTypes.SORT_GUITARS }
  | { type: ActionTypes.UPDATE_FILTERS; payload: FilterPayload }
  | { type: ActionTypes.FILTER_GUITARS }
  | { type: ActionTypes.CLEAR_FILTERS }

  // Cart Actions
  | { type: ActionTypes.ADD_TO_CART; payload: CartItem }
  | { type: ActionTypes.REMOVE_CART_ITEM; payload: string }
  | { type: ActionTypes.TOGGLE_CART_ITEM_AMOUNT; payload: UpdateCartPayload }
  | { type: ActionTypes.CLEAR_CART }
  | { type: ActionTypes.COUNT_CART_TOTALS }
  | { type: ActionTypes.LOAD_CART; payload: CartPayload };
