import Axios, { AxiosRequestConfig } from 'axios';

export const api = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

    const axiosInstance = Axios.create({
        baseURL: BASE_URL
    });

    let accessToken = localStorage.getItem('accessToken');

    axiosInstance.interceptors.request.use(
        async (config: AxiosRequestConfig) => {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`,
            };
            return config;
        }
    );

    return axiosInstance;
};