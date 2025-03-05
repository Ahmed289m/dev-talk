"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Home() {
  {
    /*const [cookies] = useCookies(["refreshToken"]);

  useEffect(() => {
    const refreshAuthToken = async () => {
      if (!cookies.refreshToken) {
        try {
          const response = await axios.get(
            "https://dev-talk.azurewebsites.net/api/Auth/refreshToken",
            { withCredentials: true }
          );
          console.log("Token refreshed:", response.data);
        } catch (error) {
          console.error("Token refresh failed:", error);
        }
      }
    };

    refreshAuthToken();
  }, [cookies]);*/
  }

  return (
    <>
      <Link href="/signup">test</Link>
      <Link href="/login">login</Link>
    </>
  );
}
