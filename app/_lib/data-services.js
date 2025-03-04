import axios from "axios";

export function getPosts() {
  return axios
    .get("https://devtalk.runasp.net/api/Post/all", {
      withCredentials: true,
    })
    .then((response) => {
      return response.data.result.posts;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
