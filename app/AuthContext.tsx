"use client";

import { login as apiLogin } from "@/services/auth";
import { UserLoginRequest } from "@/types/request.types";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface User {
  id: string;
  avatar: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: any | null;
  login: (loginRequest: UserLoginRequest) => Promise<void | any>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const doLogin = async (loginRequest: UserLoginRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiLogin(loginRequest);
      const userData = response.data;
      setUser(userData);
      return { success: true, userData };
    } catch (err: any) {
      setError(err?.message || "Login failed");
      return { success: false, error: err?.message };
    } finally {
      setIsLoading(false);
    }
  };
  const logout = () => setUser(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        login: doLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
