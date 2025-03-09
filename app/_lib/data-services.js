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

export async function getTrending({
  timeCursor = "",
  scoreCursor = 0.0,
  idCursor = "",
}) {
  try {
    const response = await axiosInstance.get("Post/trending", {
      timeCursor,
      scoreCursor,
      idCursor,
    });
    return {
      timeCursor: response.data.result.timeCursor,
      scoreCursor: response.data.result.scoreCursor,
      idCursor: response.data.result.idCursor,
    };
  } catch (error) {
    console.log("Error fetching feed:", error);
    return error.response?.data?.errors || "An unexpected error occurred";
  }
}

export async function getFeed() {
  try {
    const response = await axiosInstance.get("Post/feed");
    return {
      timeCursor: response.data.result.timeCursor,
      scoreCursor: response.data.result.scoreCursor,
      idCursor: response.data.result.idCursor,
    };
  } catch (error) {
    console.log("Error fetching feed:", error);
    return error.response?.data?.errors || "An unexpected error occurred";
  }
}
