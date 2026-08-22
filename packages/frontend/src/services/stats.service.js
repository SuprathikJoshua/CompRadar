import { apiGet } from "./api";

export const getStats = () => {
  return apiGet("/api/stats");
};