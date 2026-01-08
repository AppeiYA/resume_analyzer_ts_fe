type AuthStore = {
  accessToken: string | null;
  refreshAccessToken: (() => Promise<boolean>) | null;
};

const authStore: AuthStore = {
  accessToken: null,
  refreshAccessToken: null,
};

export const setAuthStore = (auth: AuthStore) => {
  console.log("setting auth store");
  authStore.accessToken = auth.accessToken;
  authStore.refreshAccessToken = auth.refreshAccessToken;
};

export const getAuthStore = () => authStore;
