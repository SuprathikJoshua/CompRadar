import { apiGet } from "./api";

export const getHealEvents = () => {
  return apiGet("/api/heal-events");
};