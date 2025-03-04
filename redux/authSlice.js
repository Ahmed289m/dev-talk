import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks for Login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://dev-talk.azurewebsites.net/api/Auth/login",

        { email, password },

        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return response.data.result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors || "Something went wrong"
      );
    }
  }
);

// Async Thunks for Register
export const register = createAsyncThunk(
  "auth/register",
  async (
    { firstName, lastName, userName, email, password },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "https://dev-talk.azurewebsites.net/api/Auth/register",
        { firstName, lastName, userName, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data.result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors || "Something went wrong"
      );
    }
  }
);

//refresh token https://dev-talk.azurewebsites.net/api/Auth/refreshToken

export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
  try {
    const response = await axios.post(
      "https://dev-talk.azurewebsites.net/api/Auth/refreshToken",
      { headers: { accept: `text/plain` } }
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.errors || "Something went wrong"
    );
  }
});

//create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    expTime: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          username: action.payload.username,
          email: action.payload.email,
          roles: action.payload.roles,
        };
        state.token = action.payload.token;
        state.expTime = action.payload.refreshTokenExpiration;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.expTime = action.payload.refreshTokenExpiration;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
