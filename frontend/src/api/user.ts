import { AxiosResponse } from "axios";
import { instance } from "./instance";

export type RegisterData = {
  username: string;
  email: string;
  password: string;
};
export type RegisterResponse = RegisterData;

export const regUser = ({
  username,
  email,
  password,
}: RegisterData): Promise<AxiosResponse<RegisterResponse>> => {
  return instance.post<RegisterResponse>("registration/", {
    user: {
      email,
      username,
      password,
    },
  });
};

export type AuthorizationData = {
  email: string;
  password: string;
};
export type AuthorizationResponse = {
  user: AuthorizationData & {
    token: string;
  };
};

export const authUser = ({
  email,
  password,
}: AuthorizationData): Promise<AxiosResponse<AuthorizationResponse>> => {
  return instance.post<AuthorizationResponse>("login/", {
    user: {
      email,
      password,
    },
  });
};
