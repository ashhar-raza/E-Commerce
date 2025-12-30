import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { addToken } from "../util/jwtToken";

/* 🔹 LOGIN */
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);

      addToken(response.data.access_token);
      dispatch(getProfile());

      return response.data;
    } catch (err) {
      // ✅ send error to Redux
      return rejectWithValue(
        err.response?.data?.message || "Invalid email or password"
      );
    }
  }
);

/* 🔹 PROFILE */
export const getProfile = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/profile");
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load profile"
      );
    }
  }
);
