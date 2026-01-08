const BASE_URL: string =
  (process.env.NEXT_PUBLIC_BACKEND_BASE_URL as string) ||
  "http://localhost:3333";

export function isTokenExpired(token: string): boolean {
  try {
    const payload64 = token.split(".")[1];
    const payload = JSON.parse(atob(payload64));
    const expiry = payload.exp * 1000;
    return Date.now() > expiry;
  } catch (err) {
    return true;
  }
}

export async function refresh_access_token(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/auth/access_token`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) return false;

    const data = await res.json();

    if (data.token.token) {
      localStorage.setItem("accessToken", data.token.token);
      return true;
    }
    return false;
  } catch (err) {
    console.log("Failed to refresh token", err);
    return false;
  }
}
