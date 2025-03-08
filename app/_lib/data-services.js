import axios from "axios";
import { axiosInstance } from "./axios-instance";

export async function getPosts({ pageParam = 0 }) {
  try {
    const response = await axios.get(
      `https://dev-talk.azurewebsites.net/api/Post/all?cursor=${pageParam}`
    );
    return {
      posts: response.data.result.posts,
      id_cursor: response.data.result.id_cursor,
    };
  } catch (error) {
    return error.response?.data?.errors;
  }
}

//https://dev-talk.azurewebsites.net/api/Category/all

export async function getCategories() {
  try {
    const response = await axios.get(
      `https://dev-talk.azurewebsites.net/api/Category/all`
    );
    return response.data.result;
  } catch (error) {
    return error.response?.data?.errors;
  }
}

export async function getFeed({
  timeCursor = "",
  scoreCursor = 0,
  idCursor = "",
  size = 5,
}) {
  try {
    const response = await axiosInstance.get(
      `https://dev-talk.azurewebsites.net/api/Post/feed?timeCursor=${timeCursor}&scoreCursor=${scoreCursor}&idCursor=${idCursor}&size=${size}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching feed:", error);
    return error.response?.data?.errors || "An unexpected error occurred";
  }
}
