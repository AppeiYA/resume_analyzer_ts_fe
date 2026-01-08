"use client";
import { getAuthStore } from "@/lib/auth-store";
import { isTokenExpired } from "./validateToken";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
  authToken?: string;
  [key: string]: any;
}

type RequestType = "authorized" | "public";

export async function sendRequest(
  endpoint: string,
  options: RequestOptions = {},
  type: RequestType = "authorized"
) {
  const { accessToken, refreshAccessToken } = getAuthStore();
  let token = accessToken || null;
  if (type === "authorized") {
    if (!token || isTokenExpired(token)) {
      if (refreshAccessToken) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          token = localStorage.getItem("accessToken");
        } else {
          token = null;
          return;
        }
      }
    }
  }

  const { method = "GET", body, headers = {}, authToken } = options;
  const isFormData = body instanceof FormData;

  const fetchHeaders: Record<string, string> = {
    ...(!isFormData && { "Content-Type": "application/json" }),
    ...headers,
  };

  if (authToken || token) {
    fetchHeaders["Authorization"] = `Bearer ${authToken || token}`;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${endpoint}`,
    {
      method,
      headers: fetchHeaders,
      body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
      credentials: "include",
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Request failed");
  }

  return res.json();
}
