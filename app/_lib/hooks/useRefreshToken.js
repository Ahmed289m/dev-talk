"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export const useRefreshToken = () => {
  const router = useRouter();
  const refreshToken = async () => {
    try {
      const res = await axios.get(
        "https://dev-talk.azurewebsites.net/api/Auth/refreshToken",
        {
          withCredentials: true,
        }
      );

      console.log("token trefreshesd");
      const newToken = res.data.token;
      localStorage.setItem("token", newToken);
      return newToken;
    } catch (error) {
      router.push("login");
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("storage"));

      console.error("Refresh Token Error:", error);
    }
  };

  return refreshToken;
};
