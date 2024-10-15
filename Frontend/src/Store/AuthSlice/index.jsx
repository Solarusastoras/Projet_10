import { createSlice } from '@reduxjs/toolkit';
import { loginUser, fetchUserProfile, updateUserProfileUsername } from './authActions';
import { handlePending, handleFulfilled, handleRejected } from './stateUtils';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        handleFulfilled(state, action, 'user');
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, handleRejected)
      .addCase(fetchUserProfile.pending, handlePending)
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        console.log('Fetched user profile:', {
          username: action.payload.userName,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
        });
        handleFulfilled(state, action, 'user');
      })
      .addCase(fetchUserProfile.rejected, handleRejected)
      .addCase(updateUserProfileUsername.pending, handlePending)
      .addCase(updateUserProfileUsername.fulfilled, (state, action) => {
        console.log('Updated user info:', {
          username: action.payload.userName,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
        });
        handleFulfilled(state, action, 'user');
      })
      .addCase(updateUserProfileUsername.rejected, handleRejected);
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;