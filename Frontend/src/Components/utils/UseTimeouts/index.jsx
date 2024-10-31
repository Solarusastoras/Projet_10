import { useDispatch } from "react-redux";
import { logoutUser } from "../../../Store/AuthAction";
import { useState, useEffect } from "react";

const useTimeouts = () => {
  const [logoutTimeoutId, setLogoutTimeoutId] = useState(null);
  const dispatch = useDispatch();

  const resetTimeouts = () => {
    if (logoutTimeoutId) {
      clearTimeout(logoutTimeoutId);
    }

    const newLogoutTimeoutId = setTimeout(() => {
      dispatch(logoutUser());
    }, 3 * 60 * 1000); // 3 minutes

    setLogoutTimeoutId(newLogoutTimeoutId);
  };

  useEffect(() => {
    resetTimeouts(); // Appel initial pour démarrer le timeout
    return () => {
      if (logoutTimeoutId) {
        clearTimeout(logoutTimeoutId);
      }
    };
  }, [logoutTimeoutId, dispatch]); // Ajout de logoutTimeoutId et dispatch comme dépendances

  return { resetTimeouts };
};

export default useTimeouts;
