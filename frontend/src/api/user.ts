import { instance } from "./instance";

export type RegisterData = {
  username: string;
  email: string;
  password: string;
};

export type RegisterResponse = RegisterData;

export const regUser = ({ username, email, password }: RegisterData) => {
  return instance.post<RegisterResponse>("registration/", {
    user: {
      email,
      username,
      password,
    },
  });
};
