import { useState, useEffect, useMemo } from 'react';

// Définition du hook personnalisé useToken
function useToken() {
  // Utilise useMemo pour mémoriser la valeur initiale du token à partir de localStorage
  const initialToken = useMemo(() => localStorage.getItem('token'), []);

  // Déclare une variable d'état 'token' et une fonction 'setToken' pour la mettre à jour
  const [token, setToken] = useState(initialToken);

  // Utilise useEffect pour synchroniser le token avec localStorage chaque fois que le token change
  useEffect(() => {
    // Si le token existe, le stocke dans localStorage
    if (token) {
      localStorage.setItem('token', token);
    } else {
      // Sinon, supprime le token de localStorage
      localStorage.removeItem('token');
    }
  }, [token]);

  // Retourne le token et la fonction pour le mettre à jour
  return [token, setToken];
}

export default useToken;