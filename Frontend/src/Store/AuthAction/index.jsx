import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiCall } from '../Api';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userCredentials, { rejectWithValue }) => {
    try {
      // Appel API pour se connecter
      const loginResponse = await apiCall('post', 'http://localhost:3001/api/v1/user/login', userCredentials, null, rejectWithValue);
      
      // Récupérer le token de la réponse de connexion
      const token = loginResponse.token;

      // Appel API pour récupérer le profil utilisateur
      const profileResponse = await axios.get('http://localhost:3001/api/v1/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userProfile = profileResponse.data.body;
      console.log('Fetched user profile:', userProfile);

      // Stocker les données dans le localStorage
      localStorage.setItem('username', userProfile.userName);
      console.log('Stored username:', localStorage.getItem('username'));

      localStorage.setItem('firstName', userProfile.firstName);
      console.log('Stored firstName:', localStorage.getItem('firstName'));

      localStorage.setItem('lastName', userProfile.lastName);
      console.log('Stored lastName:', localStorage.getItem('lastName'));

      return { ...loginResponse, userProfile };
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
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
      const userProfile = response.data.body;
      console.log('Fetched user profile:', userProfile);

      // Stocker les données dans le localStorage
      localStorage.setItem('username', userProfile.userName);
      console.log('username:', localStorage.getItem('username'));

      localStorage.setItem('firstName', userProfile.firstName);
      console.log('firstName:', localStorage.getItem('firstName'));

      localStorage.setItem('lastName', userProfile.lastName);
      console.log('lastName:', localStorage.getItem('lastName'));

      return userProfile;
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
    return apiCall('put', 'http://localhost:3001/api/v1/user/profile', { userName: newUsername }, token, rejectWithValue);
  }
);