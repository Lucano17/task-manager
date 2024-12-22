import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL || "http://localhost:4000/api";

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

export default instance