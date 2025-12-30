import { createSlice } from '@reduxjs/toolkit';
import {
  getProfile,
  loginUser,
  createUser,
  updateUser,
  checkEmailAvailability
} from '../thunks/userThunk';
import { setAuthToken } from '../../util/authToken';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    token: null,
    isAuthenticated: false,
    error: null,

    // 👇 NEW
    isEmailAvailable: null,
    createdUser: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.token = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      /* ================= LOGIN ================= */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token;
        setAuthToken(action.payload.access_token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= PROFILE ================= */
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      /* ================= CREATE USER ================= */
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.createdUser = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= UPDATE USER ================= */
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload; // update profile in store
      })

      /* ================= CHECK EMAIL ================= */
      .addCase(checkEmailAvailability.fulfilled, (state, action) => {
        state.isEmailAvailable = action.payload;
      })
      .addCase(checkEmailAvailability.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
