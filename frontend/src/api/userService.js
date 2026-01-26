import apiClient from "./apiClient";


export const meApi = () => {
  return apiClient.get("/auth/me");
};

export const loginApi = (data) =>
    apiClient.post("/auth/login", data);

export const logoutApi = () =>
    apiClient.post("/auth/logout");

export const signupApi = (data) =>
    apiClient.post("/auth/signup", data);

export const googleLoginApi = (data) =>
    apiClient.post("/auth/google", data);