import React, { createContext, useContext, useState } from "react";
import { USER_TYPE } from "@/types";

const INITIAL_USER = {
  email : "",
  name : ""
}

const INITIAL_STATE = {
  user : INITIAL_USER,
  isAuthenticated: false,
  isLoggedIn: false,
  isLoading: false,
  setIsAuthenticated: () => {},
  setIsLoggedIn: () => {},
};

export type AUTH_CONTEXT_TYPE = {
  user : USER_TYPE;
  isAuthenticated : boolean;
  isLoggedIn : boolean;
  isLoading : boolean;
  setIsAuthenticated : React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedIn : React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AUTH_CONTEXT_TYPE>(INITIAL_STATE);

export const AuthenticateProvider = AuthContext.Provider;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<USER_TYPE>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const value = {
    user,
    setUser,
    isLoading,
    isLoggedIn,
    isAuthenticated,
    setIsLoggedIn,
    setIsLoading,
    setIsAuthenticated
  }
  return <AuthenticateProvider value={value}>{children}</AuthenticateProvider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
