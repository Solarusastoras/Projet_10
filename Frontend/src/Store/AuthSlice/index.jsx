import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api/v1/user';

const apiCallWithAuth = async (url, method, data, token) => {
  const config = {
    method,
    url: `${API_BASE_URL}${url}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  };
  const response = await axios(config);
  return response.data.body;
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, userCredentials);
      const token = response.data.body.token;
      localStorage.setItem('token', token);

      const userProfile = await apiCallWithAuth('/profile', 'get', null, token);
      localStorage.setItem('username', userProfile.userName);
      localStorage.setItem('firstName', userProfile.firstName);
      localStorage.setItem('lastName', userProfile.lastName);

      return { token, userProfile };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const userProfile = await apiCallWithAuth('/profile', 'get', null, token);
      localStorage.setItem('username', userProfile.userName);
      localStorage.setItem('firstName', userProfile.firstName);
      localStorage.setItem('lastName', userProfile.lastName);
      return userProfile;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUserProfileUsername = createAsyncThunk(
  'auth/updateUserProfileUsername',
  async ({ newUsername }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const updatedProfile = await apiCallWithAuth('/profile', 'put', { userName: newUsername }, token);
      localStorage.setItem('username', updatedProfile.userName);
      return updatedProfile;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

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
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.userProfile;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateUserProfileUsername.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserProfileUsername.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(updateUserProfileUsername.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;