import { createAsyncThunk } from "@reduxjs/toolkit";

export const AddPost = createAsyncThunk(
  "post/add",
  async ({}, { rejectWithValue }) => {}
);
