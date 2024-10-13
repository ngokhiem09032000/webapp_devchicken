import { api } from "./apiService";

export const searchItems = async (navigate, keySearch, stock, minPrice, maxPrice, page, size) => {
    try {

        if (page === undefined || size === undefined)
            return;
        const response = await api.get("products/product-view?keySearch=" + keySearch + "&stock=" + stock + "&minPrice=" + minPrice + "&maxPrice=" + maxPrice + "&page=" + page + "&size=" + size);
        debugger;
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API searchItems:", error);
        return error.response;
    }
};


export const searchItemsByIds = async (ids) => {
    try {

        if (!ids || ids.length === 0)
            return null;
        const response = await api.post("products/products-by-ids", ids);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API searchItemsByIds:", error);
        return null;
    }
};
