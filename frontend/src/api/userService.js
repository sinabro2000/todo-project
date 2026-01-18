import apiClient from "./apiClient";


export const meApi = async () => {
    const res = await apiClient.get("/auth/me");
    return res.data;
}

export const loginApi = (data) =>
    apiClient.post("/auth/login", data);

export const logoutApi = () =>
    apiClient.post("/auth/logout");

export const signupApi = (data) =>
    apiClient.post("/auth/signup", data);