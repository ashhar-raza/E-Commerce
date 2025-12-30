import axios from "axios";
import { getToken } from "../util/jwtToken";

const axiosInstance = axios.create({
    baseURL: 'https://api.escuelajs.co/api/v1/',
});

const token = getToken();
axiosInstance.interceptors.request.use(
    (config) => {

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;