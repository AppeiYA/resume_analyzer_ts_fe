import { UserLoginRequest } from "@/types/request.types";
import { sendRequest } from ".";

const BASE_URL = "/auth";

const authRoute = (path: string = "") => `${BASE_URL}${path}`;

export const login = async (payload: UserLoginRequest) => {
  try {
    const result = await sendRequest(authRoute("/login"), {
      method: "POST",
      body: payload,
    });
    if (result) {
      return result;
    }
  } catch (err: any) {
    throw err;
  }
};
