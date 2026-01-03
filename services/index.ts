export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
  authToken?: string;
}

export async function sendRequest(endpoint: string, options: RequestOptions = {}) {
  const { method = "GET", body, headers = {}, authToken } = options;

  const fetchHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (authToken) fetchHeaders["Authorization"] = `Bearer ${authToken}`;

  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_BASE_URL + endpoint, {
    method,
    headers: fetchHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Request failed");
  }

  return res.json();
}