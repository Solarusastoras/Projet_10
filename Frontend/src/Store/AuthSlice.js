import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  fetchUserProfile,
  updateUserProfileUsername,
} from "./AuthAction.js";
import { handlePending, handleRejected } from "./AsyncHandler.js";

// Création d'un slice Redux pour gérer l'état d'authentification
const authSlice = createSlice({
  name: "auth", // Nom du slice
  initialState: {
    user: null, // Informations de l'utilisateur
    token: null, // Token d'authentification
    status: "idle", // Statut de la requête (idle, pending, succeeded, failed)
    error: null, // Message d'erreur
    firstName: null, // Prénom de l'utilisateur
    lastName: null, // Nom de famille de l'utilisateur
    userName: null, // Nom d'utilisateur
  },
  reducers: {
    // Action pour déconnecter l'utilisateur
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.firstName = null;
      state.lastName = null;
      state.userName = null;
      state.error = null; // Réinitialiser l'erreur lors de la déconnexion
    },
    // Action pour réinitialiser l'erreur
    resetError: (state) => {
      state.error = null; // Réinitialiser l'erreur
    },
  },
  extraReducers: (builder) => {
    builder
      // Gestion de l'état pendant la requête de connexion
      .addCase(loginUser.pending, (state) => {
        handlePending(state);
        state.error = null; // Réinitialiser l'erreur lors d'une nouvelle tentative de connexion
      })
      // Gestion de l'état lorsque la requête de connexion réussit
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.userProfile;
        state.token = action.payload.token;
        state.firstName = action.payload.userProfile.firstName;
        state.lastName = action.payload.userProfile.lastName;
        state.userName = action.payload.userProfile.userName;
      })
      // Gestion de l'état lorsque la requête de connexion échoue
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Stocker le message d'erreur
      })
      // Gestion de l'état pendant la requête de récupération du profil utilisateur
      .addCase(fetchUserProfile.pending, (state) => handlePending(state))
      // Gestion de l'état lorsque la requête de récupération du profil utilisateur réussit
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.userName = action.payload.userName;
      })
      // Gestion de l'état lorsque la requête de récupération du profil utilisateur échoue
      .addCase(fetchUserProfile.rejected, (state, action) =>
        handleRejected(state, action)
      )
      // Gestion de l'état pendant la requête de mise à jour du nom d'utilisateur
      .addCase(updateUserProfileUsername.pending, (state) =>
        handlePending(state)
      )
      // Gestion de l'état lorsque la requête de mise à jour du nom d'utilisateur réussit
      .addCase(updateUserProfileUsername.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user.userName = action.payload.userName;
        state.userName = action.payload.userName;
      })
      // Gestion de l'état lorsque la requête de mise à jour du nom d'utilisateur échoue
      .addCase(updateUserProfileUsername.rejected, (state, action) =>
        handleRejected(state, action)
      );
  },
});

// Exporter l'action logout pour pouvoir l'utiliser dans les composants
export const { logout, resetError } = authSlice.actions;

// Exporter le reducer pour l'ajouter au store Redux
export default authSlice.reducer;