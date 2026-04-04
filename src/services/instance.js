import axios from "axios";

// const baseURL = 'https://tarefasapi.kauanrodrigues.com.br';
const baseURL = 'http://localhost:7007';

export const instance = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 17000,
});


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve();
        }
    });
    failedQueue = [];
};

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Ignora se já é a rota de refresh ou login
        if (originalRequest.url === "/refresh" || originalRequest.url === "/user/login") {
            return Promise.reject(error);
        }

        if (error.response?.data?.code === "TOKEN_EXPIRED" && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => instance(originalRequest));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await instance.post("/refresh");
                processQueue(null);
                return instance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError);
                window.location.href = "/login";
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);


export default instance;