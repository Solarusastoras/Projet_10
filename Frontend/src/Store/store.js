// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Components/Form/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
