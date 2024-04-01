import { jwtDecode } from "jwt-decode";

const USER_TOKEN_KEY: string = "user_token";
const USER_ID_KEY: string = "user_id";

export const getId = (): string | null => localStorage.getItem(USER_ID_KEY);

export const setId = (token: string): void => {
  localStorage.setItem(USER_ID_KEY, JSON.stringify(jwtDecode(token)?.id));
};

export const setToken = (token: string): void => {
  localStorage.setItem(USER_TOKEN_KEY, token);
  localStorage.setItem(USER_ID_KEY, JSON.stringify(jwtDecode(token)?.id));
};

export const getToken = (): string | null =>
  localStorage.getItem(USER_TOKEN_KEY);

export const clearUserData = (): void => {
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USER_TOKEN_KEY);
};
