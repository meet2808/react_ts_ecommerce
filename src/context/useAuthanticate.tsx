import React, { createContext, useContext, useState } from "react";
import { USER_TYPE } from "@/types";
import authService from "@/appwrite/Auth";

const INITIAL_USER = {
  email: "",
  name: "",
  id: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isAuthenticated: false,
  isLoggedIn: false,
  isLoading: false,
  setIsAuthenticated: () => {},
  setIsLoggedIn: () => {},
  setIsLoading: () => {},
  setUser: () => {},
  checkAuthUser: async () => false as boolean
};

export type AUTH_CONTEXT_TYPE = {
  user: USER_TYPE;
  isAuthenticated: boolean;
  isLoggedIn: boolean;
  isLoading: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<USER_TYPE>>;
  checkAuthUser : () => Promise<boolean>;
};

export const AuthContext = createContext<AUTH_CONTEXT_TYPE>(INITIAL_STATE);

export const AuthenticateProvider = AuthContext.Provider;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<USER_TYPE>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkAuthUser = async () => {
    try {
      let account = await authService.getAccount();
      if (account) { 
        setUser({
          name: account.name,
          email: account.email,
          id: account.$id,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    setUser,
    isLoading,
    isLoggedIn,
    isAuthenticated,
    checkAuthUser,
    setIsLoggedIn,
    setIsLoading,
    setIsAuthenticated,
  };

  return <AuthenticateProvider value={value}>{children}</AuthenticateProvider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
