import axios from "axios";

const ACCESS_TOKEN_KEY = "findasolicitor.access_token";
const REFRESH_TOKEN_KEY = "findasolicitor.refresh_token";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api",
});

export function getAccessToken() {
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens({ access, refresh }) {
  if (access) {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, access);
  }
  if (refresh) {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  }
}

export function clearTokens() {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
}

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

