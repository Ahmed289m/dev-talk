import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://dev-talk.azurewebsites.net/api",
  withCredentials: true,
});
