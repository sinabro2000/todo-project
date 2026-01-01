import apiClient from "./apiclient";




export const login = (data) =>
    apiClient.post("/auth/login", data);

export const logout = () =>
    apiClient.post("/auth/logout");