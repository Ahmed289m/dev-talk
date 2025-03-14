import useAuth from "@/app/_lib/hooks/useAuth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addPost = createAsyncThunk(
  "post/add",
  async ({ Title, Body, Files, Categories }, { rejectWithValue }) => {
    const axiosInstance = useAuth();
    const formData = new FormData();
    formData.append("Title", Title);
    formData.append("Body", Body);
    Files.forEach((file) => {
      formData.append("Files", file);
    });
    Categories.forEach((cat) => {
      formData.append("Categories", cat);
    });
    try {
      const response = await axiosInstance.post("Post/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response?.data?.errors);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPost.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
