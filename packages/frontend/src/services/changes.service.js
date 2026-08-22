import { apiGet } from "./api";

export const getChanges = () => {
  return apiGet("/api/changes");
};

export const getChangeById = (id) => {
  return apiGet(`/api/changes/${id}`);
};