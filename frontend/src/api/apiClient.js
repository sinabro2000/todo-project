import axios from "axios";

const apiClient = axios.create({
    /*백엔드 주소*/

    baseURL: "http://localhost:8080",
    timeout: 5000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});


export default apiClient;
