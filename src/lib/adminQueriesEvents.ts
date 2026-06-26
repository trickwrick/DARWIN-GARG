export const ADMIN_QUERIES_UPDATED_EVENT = "admin-queries-updated";

export function notifyAdminQueriesUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(ADMIN_QUERIES_UPDATED_EVENT));
  }
}
