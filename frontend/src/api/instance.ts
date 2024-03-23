import axios, { AxiosInstance } from "axios";

const baseHeaders = {};

export const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
});
