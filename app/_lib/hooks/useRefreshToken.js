"use client";

import axios from "axios";

export const useRefreshToken = () => {
  const refreshToken = async () => {
    const res = await axios.post(
      "https://dev-talk.azurewebsites.net/api/Auth/refreshToken",
      {}
    );
    localStorage.setItem("token", res.data.token);
  };
  return refreshToken;
};
