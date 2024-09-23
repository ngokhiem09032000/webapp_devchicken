import axios from "axios";

// URL gốc của API (có thể cấu hình theo ý bạn)
// const API_BASE_URL = "http://14.225.217.118:8080/demo1";
const API_BASE_URL = "http://localhost:8080/demo1";

// Cấu hình axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 giây timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiToken = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 giây timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Hàm lấy danh sách items từ API
export const getItems = async () => {
  try {
    const response = await api.get("/items");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};

// Hàm thêm một item mới vào API
export const addItem = async (newItem) => {
  try {
    const response = await api.post("/items", newItem);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};

// Hàm xóa một item
export const deleteItem = async (id) => {
  try {
    const response = await api.delete(`/items/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};
