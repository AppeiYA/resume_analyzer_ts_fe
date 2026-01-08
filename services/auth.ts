import { UserLoginRequest, UserRegisterRequest } from "@/types/request.types";
import { sendRequest } from ".";

const BASE_URL = "/auth";

const authRoute = (path: string = "") => `${BASE_URL}${path}`;

export const login = async (payload: UserLoginRequest) => {
  try {
    const result = await sendRequest(authRoute("/login"), {
      method: "POST",
      body: payload,
    }, "public");
    if (result) {
      return result;
    }
  } catch (err: any) {
    throw err;
  }
};

export const register = async (payload: UserRegisterRequest) => {
  try {
    const result = await sendRequest(
      authRoute("/register"),
      {
        method: "POST",
        body: payload,
      },
      "public"
    );
    if (result) {
      return result;
    }
  } catch (err: any) {
    throw err;
  }
}

export const logout = async () => {
    return await sendRequest(authRoute("/logout"), {
      method: "POST",
    })
}
