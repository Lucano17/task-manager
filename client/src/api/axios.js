import axios from "axios";

// const BASE_URL = import.meta.env.BACKEND_SERVER_URL;

const instance = axios.create({
    baseURL: import.meta.env.MODE === "production" 
        ? import.meta.env.VITE_BACKEND_SERVER_URL
        : "http://localhost:4000",
    withCredentials: true,
});

export default instance