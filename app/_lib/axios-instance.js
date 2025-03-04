"use client";

import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || null;
  }
  return null;
};

// Create Axios instance
export const axiosInstance = axios.create({
  baseURL: "https://dev-talk.azurewebsites.net/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: getToken() ? `${getToken()}` : "",
  },
  withCredentials: true, // Required for refreshToken API (uses cookies)
});

// Interceptor for requests
axiosInstance.interceptors.request.use(async (req) => {
  let accessToken = getToken();

  if (!accessToken) return req; // No token? Just continue

  try {
    const decodedToken = jwtDecode(accessToken);
    const isExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;

    if (!isExpired) {
      req.headers.Authorization = `Bearer ${accessToken}`;
      return req;
    }

    // If token is expired, call refreshToken API
    const response = await axios.post(
      "https://dev-talk.azurewebsites.net/api/Auth/refreshToken",
      {},
      { withCredentials: true }
    );

    const newToken = response.data.token;

    localStorage.setItem("token", newToken);

    req.headers.Authorization = `${newToken}`;
    return req;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return req;
  }
});
