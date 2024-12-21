import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.APP_URL}/api`,
    withCredentials: true
})

export default instance