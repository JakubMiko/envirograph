export const apiUrl = process.env.REACT_APP_API_URL || "";

export function apiFetch(path, options = {}) {
  return fetch(`${apiUrl}${path}`, options);
}