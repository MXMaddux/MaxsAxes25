"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface UserContextType {
  loginWithRedirect: () => Promise<void>;
  logout: () => Promise<void>;
  myUser: User | null;
  isLoading: boolean;
  error: Error | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [myUser, setMyUser] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setMyUser({
        name: session.user.name || null,
        email: session.user.email || null,
        image: session.user.image || null,
      });
    } else {
      setMyUser(null);
    }
  }, [session, status]);

  const loginWithRedirect = async (provider: string = "google") => {
    try {
      await signIn(provider);
    } catch (err) {
      setError(err as Error);
    }
  };

  const logout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
    } catch (err) {
      setError(err as Error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        loginWithRedirect,
        logout,
        myUser,
        isLoading: status === "loading",
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
