import { createSlice } from '@reduxjs/toolkit';
import { loginUser, fetchUserProfile, updateUserProfileUsername } from './AuthAction.js';
import { handlePending, handleFulfilled, handleRejected } from './AsyncHandler.js';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => handlePending(state))
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.userProfile;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => handleRejected(state, action))
      .addCase(fetchUserProfile.pending, (state) => handlePending(state))
      .addCase(fetchUserProfile.fulfilled, (state, action) => handleFulfilled(state, action, 'user'))
      .addCase(fetchUserProfile.rejected, (state, action) => handleRejected(state, action))
      .addCase(updateUserProfileUsername.pending, (state) => handlePending(state))
      .addCase(updateUserProfileUsername.fulfilled, (state, action) => handleFulfilled(state, action, 'user'))
      .addCase(updateUserProfileUsername.rejected, (state, action) => handleRejected(state, action));
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;