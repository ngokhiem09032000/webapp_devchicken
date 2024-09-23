import { apiToken } from "./apiService";

apiToken.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getItems = async (endpoint) => {
    try {
        const response = await apiToken.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API getItems:", error);
        throw error;
    }
};

export const update = async (module, endpoint) => {
    try {
        const response = await apiToken.put(endpoint + "/" + module.id, module);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API update:", error);
        return error.response;
    }
};

export const create = async (module, endpoint) => {
    try {
        const response = await apiToken.post(endpoint, module);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API create:", error);
        return error.response.data;
    }
};

export const remove = async (id, endpoint) => {
    try {
        const response = await apiToken.delete(endpoint + "/" + id);
    } catch (error) {
        console.error("Lỗi khi gọi API remove:", error);
        return error.response;
    }
};