"use client";

import axios from "axios";
import { redirect } from "next/dist/server/api-utils";

export const useRefreshToken = () => {
  const refreshToken = async () => {
    try {
      const res = await axios.get(
        "https://dev-talk.azurewebsites.net/api/Auth/refreshToken",
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        const newToken = res.data.token;
        localStorage.setItem("token", newToken);
        return newToken;
      } else {
        redirect("/login");
        throw new Error("Failed to refresh token");
      }
    } catch (error) {
      console.error(
        "Refresh Token Error:",
        error.response?.status,
        error.message
      );
      return null;
    }
  };

  return refreshToken;
};
