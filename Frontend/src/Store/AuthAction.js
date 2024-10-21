import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiCall } from './Api';
import { LOGIN_URL, PROFILE_URL } from './ConfigApi.js';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userCredentials, { rejectWithValue }) => {
    try {
      // Appel API pour se connecter
      const loginResponse = await apiCall('post', LOGIN_URL, userCredentials, null, rejectWithValue);
      
      // Récupérer le token de la réponse de connexion
      const token = loginResponse.token;

      // Appel API pour récupérer le profil utilisateur
      const userProfile = await apiCall('get', PROFILE_URL, null, token, rejectWithValue);

      // Stocker les données dans le localStorage
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
      const userProfile = await apiCall('get', PROFILE_URL, null, token, rejectWithValue);

      // Stocker les données dans le localStorage
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
    return apiCall('put', PROFILE_URL, { userName: newUsername }, token, rejectWithValue);
  }
);