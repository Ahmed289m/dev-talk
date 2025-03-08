import axios from "axios";
import { getToken, setToken, removeToken } from "./cookies";

export const axiosInstance = axios.create({
  baseURL: "https://dev-talk.azurewebsites.net/api",
  headers: {
    "Content-Type": "application/json",
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

// Handle token refreshing on 401 error
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.get(
          "https://dev-talk.azurewebsites.net/api/Auth/refreshToken",
          { withCredentials: true }
        );

        const { token } = response.data;
        setToken(token);
        originalRequest.headers.Authorization = `Bearer ${token}`;

        return axiosInstance(originalRequest);
      } catch (error) {
        removeToken();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
