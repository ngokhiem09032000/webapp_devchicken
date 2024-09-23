import { apiToken } from "./apiService";

// Thiết lập interceptor chỉ một lần
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

// Hàm get list user
export const getItems = async () => {
    try {
        const response = await apiToken.get("users");
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API getItems:", error);
        throw error;
    }
};

export const updateUser = async (user) => {
    try {
        const response = await apiToken.put("users/" + user.id, user);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API updateUser:", error);
        return error.response;
    }
};

export const createUser = async (user) => {
    try {
        const response = await apiToken.post("users", user);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API createUser:", error);
        return error.response.data;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await apiToken.delete("users/" + id);
    } catch (error) {
        console.error("Lỗi khi gọi API deleteUser:", error);
        return error.response;
    }
};