import axios from "axios";

export function getPosts() {
  return axios
    .get("https://dev-talk.azurewebsites.net/api/Post/all", {
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
