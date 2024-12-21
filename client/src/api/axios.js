import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/api`,
    withCredentials: true
})

export default instance