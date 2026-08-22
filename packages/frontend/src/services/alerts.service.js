import { apiGet } from "./api";

export const getAlerts = () => {
  return apiGet("/api/alerts");
};