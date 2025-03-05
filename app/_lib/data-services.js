import axios from "axios";
import { axiosInstance } from "./axios-instance";

export async function getPosts() {
  try {
    const response = await axios.get(
      "https://dev-talk.azurewebsites.net/api/Post/all",
      {}
    );
    return response.data?.result?.posts;
  } catch (error) {
    return error.response?.data?.errors;
  }
}

export async function getFeed() {
  try {
    const response = await axiosInstance.get(
      "https://dev-talk.azurewebsites.net/api/Post/feed",
      {}
    );
    return response.data?.result?.posts;
  } catch (error) {
    return error.response?.data?.errors;
  }
}
