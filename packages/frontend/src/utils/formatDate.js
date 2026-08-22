export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  // Format as: "Aug 21, 2026, 3:30 PM"
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};