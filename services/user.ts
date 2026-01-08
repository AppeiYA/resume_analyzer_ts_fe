import { sendRequest } from ".";

const BASE_URL = "/users";

const userRoute = (path: string = "") => `${BASE_URL}${path}`;

export const analyzeResume = async (formData: FormData) => {
  try {
    const result = await sendRequest(
      userRoute("/resume/analyze"),
      {
        method: "POST",
        body: formData,
      },
      "authorized"
    );
    if (result) {
      return result;
    }
  } catch (error: any) {
    throw error;
  }
};
