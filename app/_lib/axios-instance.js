import axios from "axios";

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

export const removeTokens = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

export const axiosInstance = axios.create({
  baseURL: "https://dev-talk.azurewebsites.net/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = getToken();

    console.log("Interceptor - Token Retrieved:", token);
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
    console.log("start with refresh token", error);
    const originalRequest = error.config;

    if (
      typeof window !== "undefined" &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      console.log("start with refresh token cond. on status");

      originalRequest._retry = true;

      try {
        const response = await axios.get(
          "https://dev-talk.azurewebsites.net/api/Auth/refreshToken",
          { withCredentials: true }
        );
        console.log("token refreshed", response);
        const { token } = response.data;
        setToken(token);
        originalRequest.headers.Authorization = `Bearer ${token}`;

        return axiosInstance(originalRequest);
      } catch (error) {
        console.log("inside error after fail to refresh", error);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
