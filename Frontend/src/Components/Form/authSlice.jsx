import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fonction utilitaire pour les appels API
const apiCall = async (method, url, data, token, rejectWithValue) => {
  try {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await axios({ method, url, data, ...config });
    return response.data.body;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
};

// Actions asynchrones
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

// Fonction utilitaire pour gérer les états des actions asynchrones
const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleFulfilled = (state, action, key) => {
  state.loading = false;
  state[key] = action.payload;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload?.message || 'An error occurred';
};

// Slice d'authentification
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