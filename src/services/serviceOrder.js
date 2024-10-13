import { api } from "./apiService";

export const create = async (module) => {
    try {
        const response = await api.post("orders", module);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API create:", error);
        return error.response.data;
    }
};
