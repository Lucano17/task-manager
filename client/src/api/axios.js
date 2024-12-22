import axios from "axios";

// const BASE_URL = import.meta.env.BACKEND_SERVER_URL;

const instance = axios.create({
    baseURL: import.meta.env.MODE === "production" 
        ? "https://task-manager-production-3f1d.up.railway.app" 
        : "http://localhost:4000",
    withCredentials: true,
});