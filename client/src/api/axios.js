import axios from "axios";

const BASE_URL = import.meta.env.BACKEND_SERVER_URL;

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

export default instance