import { apiGet, apiPost } from "./api";

export const getRivals = () => {
  return apiGet("/api/rivals");
};

export const getRivalById = (id) => {
  return apiGet(`/api/rivals/${id}`);
};

export const triggerManualScrape = (targetId) => {
  return apiPost("/api/scrape/manual", { targetId });
};
