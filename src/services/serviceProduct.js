import { api } from "./apiService";

export const searchItems = async (navigate, keySearch, stock, minPrice, maxPrice, page, size) => {
    try {

        if (page === undefined || size === undefined)
            return;
        const response = await api.get("products/product-view?keySearch=" + keySearch + "&stock=" + stock + "&minPrice=" + minPrice + "&maxPrice=" + maxPrice + "&page=" + page + "&size=" + size);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API searchItems:", error);
        return error.response;
    }
};