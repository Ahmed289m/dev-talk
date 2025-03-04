"use client";

import axios from "axios";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || null;
  }
  return null;
};

const setToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

export const axiosInstance = axios.create({
  baseURL: "https://dev-talk.azurewebsites.net/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: getToken() ? `Bearer ${getToken()}` : "",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const response = await axios.get(
          "https://dev-talk.azurewebsites.net/api/Auth/refreshToken",
          { withCredentials: true }
        );
        const { token } = response.data;
        // Save new token to localStorage.
        setToken(token);
        // Update default headers and original request headers.
        axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
        originalRequest.headers.Authorization = `Bearer ${token}`;
        // Retry original request with new token.
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login.
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
