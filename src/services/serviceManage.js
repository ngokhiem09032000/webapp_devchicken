import { apiToken, api } from "./apiService";
import { jwtDecode } from 'jwt-decode';

const expTime = 15; // đơn vị phút ( thời gian còn lại để refresh token)

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

export const getItems = async (endpoint, navigate) => {
    try {
        if (!verifyRefreshToken(navigate))
            return
        const response = await apiToken.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API getItems:", error);
        return error.response;
    }
};

export const update = async (module, endpoint, navigate) => {
    try {
        debugger;
        if (!verifyRefreshToken(navigate))
            return
        const response = await apiToken.put(endpoint + "/" + module.id, module);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API update:", error);
        return error.response;
    }
};

export const create = async (module, endpoint, navigate) => {
    try {
        if (!verifyRefreshToken(navigate))
            return
        const response = await apiToken.post(endpoint, module);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API create:", error);
        return error.response.data;
    }
};

export const remove = async (id, endpoint, navigate) => {
    try {
        if (!verifyRefreshToken(navigate))
            return
        const response = await apiToken.delete(endpoint + "/" + id);
    } catch (error) {
        console.error("Lỗi khi gọi API remove:", error);
        return error.response;
    }
};

export const getKeys = async (endpoint, navigate) => {
    try {
        if (!verifyRefreshToken(navigate))
            return
        const response = await apiToken.get(endpoint + "/keys");
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API getKeys:", error);
        return error.response;
    }
};


// verify token
const introspect = async (tk) => {
    try {
        debugger;
        const module = { token: tk };
        const response = await api.post("auth/introspect", module);
        if (!response
            || !response.data
            || !response.data.result
            || !response.data.result.valid)
            return false;
        return true;
    } catch (error) {
        console.error("Lỗi khi gọi API introspect:", error);
        return false;
    }
};

// check thời gian xem token sắp hết hạn chưa
const isTokenExpiringSoon = (token) => {
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000; // Đổi sang mili giây
    const currentTime = Date.now();
    const timeLeft = expirationTime - currentTime;
    return timeLeft < expTime * 60 * 1000 && timeLeft > 0; // Còn ít hơn expTime phút , quá thời gian thì không được refreshToken
};

// refresh token
const refreshAccessToken = async (tk) => {
    try {
        debugger;
        const module = { token: tk };
        const response = await api.post("auth/refresh", module);
        if (response
            && response.data
            && response.data.result
            && response.data.result.authenticated)
            localStorage.setItem("authToken", response.data.result.token);
    } catch (error) {
        console.error("Lỗi khi gọi API refreshAccessToken:", error);
    }
};

// hàm verify and refresh token tổng hợp (Luôn được gọi khi call api) \
// true : phải thực hiện tiếp sau khi gọi hàm này 
// false : quay về trang đăng nhập và xóa token trong localStorage
const verifyRefreshToken = async (navigate) => {
    const tk = localStorage.getItem("authToken");
    const tokenValid = await introspect(tk);
    if (!tokenValid) {
        localStorage.removeItem("authToken");
        navigate("/");
        return false;
    }
    if (isTokenExpiringSoon(tk)) {
        refreshAccessToken(tk); // Gọi API để lấy token mới
    }
    return true;
}