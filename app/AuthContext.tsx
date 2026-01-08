"use client";
import { setAuthStore } from "@/lib/auth-store";
import { login as apiLogin, logout } from "@/services/auth";
import { refresh_access_token } from "@/services/validateToken";
import { UserLoginRequest } from "@/types/request.types";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: any | null;
  login: (loginRequest: UserLoginRequest) => Promise<void | any>;
  logout: () => void;
  refreshAccessToken: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  USER: "user",
} as const;

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  const [accessToken, setAccessToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) || null;
  });

  const [error, setError] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    }
  }, [accessToken]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [user]);

  const doLogin = useCallback(async (loginRequest: UserLoginRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiLogin(loginRequest);
      const userData = response.data.data;
      const access_token = response.data.token;

      setAccessToken(access_token);
      setUser(userData);

      return { success: true, userData };
    } catch (err: any) {
      const errorMessage = err?.message || "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshAccessToken = useCallback(async () => {
    try {
      const success = await refresh_access_token();
      if (success) {
        const newToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        setAccessToken(newToken);
        return true;
      } else {
        setUser(null);
        setAccessToken(null);
        router.push("/login?session=expired");
        return false;
      }
    } catch (error: any) {
      setUser(null);
      setAccessToken(null);
      router.push("/login?session=expired");
      return false;
    }
  }, [router]);

  const doLogout = useCallback(async () => {
    try {
      await logout();
      router.push("/login?session=expired")
    } catch (error: any) {
      setError(error.message);
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  }, []);

  useEffect(() => {
    setAuthStore({
      accessToken,
      refreshAccessToken,
    });
  }, [accessToken, refreshAccessToken]);

  const contextValue = useMemo(
    () => ({
      user,
      accessToken,
      isAuthenticated: !!user,
      isLoading,
      error,
      login: doLogin,
      logout: doLogout,
      refreshAccessToken,
    }),
    [user, accessToken, isLoading, error, doLogin, doLogout, refreshAccessToken]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
