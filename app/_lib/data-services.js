import axios from "axios";

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
