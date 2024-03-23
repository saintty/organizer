const USER_TOKEN_KEY: string = "user_token";

export const setToken = (token: string) =>
  localStorage.setItem(USER_TOKEN_KEY, token);

export const getToken = (): string | null =>
  localStorage.getItem(USER_TOKEN_KEY);
