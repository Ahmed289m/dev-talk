import { axiosInstance } from "@/app/_lib/axios-instance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async Thunks for Login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/Auth/login", {
        email,
        password,
      });

      if (!response.data || !response.data.result) {
        throw new Error("Invalid response from server");
      }

      const { token } = response.data.result;
      localStorage.setItem("token", token);

      return response.data.result;
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
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
      const response = await axiosInstance.post("/Auth/register", {
        firstName,
        lastName,
        userName,
        email,
        password,
      });
      return response.data.result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors || "Something went wrong"
      );
    }
  }
);

//create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
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
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
