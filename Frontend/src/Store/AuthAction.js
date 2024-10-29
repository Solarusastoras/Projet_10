import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall } from "./Api";
import { LOGIN_URL, PROFILE_URL } from "./ConfigApi.js";
import { logout } from './AuthSlice';

// Action asynchrone pour connecter un utilisateur
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      // Appel API pour se connecter
      const loginResponse = await apiCall(
        "post",
        LOGIN_URL,
        userCredentials,
        null,
        rejectWithValue
      );

      // Récupérer le token de la réponse de connexion
      const token = loginResponse.token;

      // Appel API pour récupérer le profil utilisateur en utilisant le token
      const userProfile = await apiCall(
        "get",
        PROFILE_URL,
        null,
        token,
        rejectWithValue
      );

      // Retourner le token et le profil utilisateur
      return { token, userProfile };
    } catch (error) {
      // En cas d'erreur, rejeter avec la valeur de l'erreur
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Action asynchrone pour récupérer le profil utilisateur
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { getState, rejectWithValue }) => {
    // Récupérer le token depuis l'état global (store Redux)
    const token = getState().auth.token;
    try {
      // Appel API pour récupérer le profil utilisateur en utilisant le token
      const userProfile = await apiCall(
        "get",
        PROFILE_URL,
        null,
        token,
        rejectWithValue
      );
      // Retourner le profil utilisateur
      return userProfile;
    } catch (error) {
      // En cas d'erreur, rejeter avec la valeur de l'erreur
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Action asynchrone pour mettre à jour le nom d'utilisateur
export const updateUserProfileUsername = createAsyncThunk(
  "auth/updateUserProfileUsername",
  async ({ newUsername }, { getState, rejectWithValue }) => {
    // Récupérer le token depuis l'état global (store Redux)
    const token = getState().auth.token;
    try {
      // Appel API pour mettre à jour le nom d'utilisateur en utilisant le token
      const updatedProfile = await apiCall(
        "put",
        PROFILE_URL,
        { userName: newUsername },
        token,
        rejectWithValue
      );
      // Retourner le profil utilisateur mis à jour
      return updatedProfile;
    } catch (error) {
      // En cas d'erreur, rejeter avec la valeur de l'erreur
      return rejectWithValue(error.response?.data || error.message);
    }
  }
  
);


export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { dispatch }) => {
  dispatch(logout());
});

