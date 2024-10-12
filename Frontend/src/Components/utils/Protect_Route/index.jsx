import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    // Redirige vers la page de login si l'utilisateur n'est pas connecté
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;