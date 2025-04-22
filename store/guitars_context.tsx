"use client";

import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";
import { ActionTypes } from "@/actions";

interface Guitar {
  id: string;
  model: string;
  brand: string;
  image: string;
  price: number;
  stock: number;
}

interface GuitarsState {
  guitars: Guitar[];
  isSidebarOpen: boolean;
  guitarsLoading: boolean;
  guitarsError: boolean;
}

interface GuitarsContextValue extends GuitarsState {
  addGuitar: (guitarData: Omit<Guitar, "id">) => void;
  setGuitars: (guitars: Guitar[]) => void;
  deleteGuitar: (id: string) => void;
  updateGuitar: (id: string, guitarData: Partial<Guitar>) => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  fetchGuitars: (url: string) => Promise<void>;
}

type GuitarsAction =
  | { type: ActionTypes.SIDEBAR_OPEN }
  | { type: ActionTypes.SIDEBAR_CLOSE }
  | { type: ActionTypes.GET_GUITARS_BEGIN }
  | { type: ActionTypes.GET_GUITARS_SUCCESS; payload: Guitar[] }
  | { type: ActionTypes.GET_GUITARS_ERROR }
  | { type: "ADD"; payload: Guitar }
  | { type: "SET"; payload: Guitar[] }
  | { type: "UPDATE"; payload: { id: string; data: Partial<Guitar> } };

//   Create context with initial values
export const GuitarsContext = createContext<GuitarsContextValue | undefined>(
  undefined
);

function guitarsReducer(
  state: GuitarsState,
  action: GuitarsAction
): GuitarsState {
  switch (action.type) {
    case ActionTypes.SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true };
    case ActionTypes.SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false };
    case ActionTypes.GET_GUITARS_BEGIN:
      return { ...state, guitarsLoading: true, guitarsError: false };
    case ActionTypes.GET_GUITARS_SUCCESS:
      return { ...state, guitarsLoading: false, guitars: action.payload };
    case ActionTypes.GET_GUITARS_ERROR:
      return { ...state, guitarsLoading: false, guitarsError: true };
    case "ADD":
      return { ...state, guitars: [action.payload, ...state.guitars] };
    case "SET":
      return { ...state, guitars: action.payload };
    case "UPDATE":
      const updatableGuitarIndex = state.guitars.findIndex(
        (guitar) => guitar.id === action.payload.id
      );
      const updatableGuitar = state.guitars[updatableGuitarIndex];
      const updatedItem = { ...updatableGuitar, ...action.payload.data };
      const updatedGuitars = [...state.guitars];
      updatedGuitars[updatableGuitarIndex] = updatedItem;
      return { ...state, guitars: updatedGuitars };
    default:
      return state;
  }
}

export function GuitarsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(guitarsReducer, {
    guitars: [],
    isSidebarOpen: false,
    guitarsLoading: false,
    guitarsError: false,
  });

  const openSidebar = () => {
    dispatch({ type: ActionTypes.SIDEBAR_OPEN });
  };
  const closeSidebar = () => {
    dispatch({ type: ActionTypes.SIDEBAR_CLOSE });
  };

  const addGuitar = (guitarData: Omit<Guitar, "id">) => {
    // In a real app, you'd generate a proper ID
    const newGuitar: Guitar = { ...guitarData, id: Math.random().toString() };
    dispatch({ type: "ADD", payload: newGuitar });
  };

  const setGuitars = (guitars: Guitar[]) => {
    dispatch({ type: "SET", payload: guitars });
  };

  const updateGuitar = (id: string, guitarData: Partial<Guitar>) => {
    dispatch({ type: "UPDATE", payload: { id, data: guitarData } });
  };

  const deleteGuitar = (id: string) => {
    // You might want to implement this
    setGuitars(state.guitars.filter((guitar) => guitar.id !== id));
  };

  const fetchGuitars = async (url: string) => {
    dispatch({ type: ActionTypes.GET_GUITARS_BEGIN });
    try {
      const response = await axios.get<Guitar[]>(url);
      const products = response.data;
      dispatch({ type: ActionTypes.GET_GUITARS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: ActionTypes.GET_GUITARS_ERROR });
    }
  };

  const value: GuitarsContextValue = {
    guitars: state.guitars,
    isSidebarOpen: state.isSidebarOpen,
    guitarsLoading: state.guitarsLoading,
    guitarsError: state.guitarsError,
    addGuitar,
    setGuitars,
    deleteGuitar,
    updateGuitar,
    openSidebar,
    closeSidebar,
    fetchGuitars,
  };

  return (
    <GuitarsContext.Provider value={value}>{children}</GuitarsContext.Provider>
  );
}

// Custom hook
export const useGuitarsContext = () => {
  const context = useContext(GuitarsContext);
  if (!context) {
    throw new Error(
      "useGuitarsContext must be used within a GuitarsContextProvider"
    );
  }
  return context;
};
