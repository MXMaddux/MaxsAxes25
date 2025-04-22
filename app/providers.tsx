"use client";

import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/store/user_context";
import { CartProvider } from "@/store/cart_context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GuitarsContextProvider } from "@/store/guitars_context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <GuitarsContextProvider>
        <UserProvider>
          <CartProvider>{children}</CartProvider>
        </UserProvider>
      </GuitarsContextProvider>
    </SessionProvider>
  );
}
