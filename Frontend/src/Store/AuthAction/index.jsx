import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiCall } from './api';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userCredentials, { rejectWithValue }) => {
    return apiCall('post', 'http://localhost:3001/api/v1/user/login', userCredentials, null, rejectWithValue);
  }
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const response = await axios.get('http://localhost:3001/api/v1/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Fetched user profile:', response.data.body);
      return response.data.body;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserProfileUsername = createAsyncThunk(
  'auth/updateUserProfileUsername',
  async ({ newUsername, firstName, lastName }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    console.log('Sending update request with:', { newUsername, firstName, lastName });
    return apiCall('put', 'http://localhost:3001/api/v1/user/profile', { userName: newUsername, firstName, lastName }, token, rejectWithValue);
  }
);