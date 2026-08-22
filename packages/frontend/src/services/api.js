import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const apiGet = async (path) => {
  try {
    const response = await api.get(path);
    return response.data;
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || error.message || "API request failed";
    throw new Error(`API Error ${status}: ${message}`);
  }
};
