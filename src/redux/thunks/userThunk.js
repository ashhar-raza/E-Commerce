import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

/* 🔹 LOGIN */
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      dispatch(getProfile());
      return response.data;
    } catch (err) {
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

/* 🔹 CREATE USER */
export const createUser = createAsyncThunk(
  "user/create",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users", userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create user"
      );
    }
  }
);

/* 🔹 UPDATE USER */
export const updateUser = createAsyncThunk(
  "user/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/users/${id}`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update user"
      );
    }
  }
);

/* 🔹 CHECK EMAIL AVAILABILITY */
export const checkEmailAvailability = createAsyncThunk(
  "user/checkEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/is-available", { email });
      return response.data.isAvailable;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to check email"
      );
    }
  }
);
