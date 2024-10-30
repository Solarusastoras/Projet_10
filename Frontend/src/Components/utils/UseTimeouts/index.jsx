import { useDispatch } from "react-redux";
import { logoutUser } from "../../../Store/AuthAction";
import { useState, useEffect } from "react";

const useTimeouts = () => {
  const [logoutTimeoutId, setLogoutTimeoutId] = useState(null);
  const [sessionTimeoutId, setSessionTimeoutId] = useState(null);
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

  const startSessionTimeout = () => {
    if (sessionTimeoutId) {
      clearTimeout(sessionTimeoutId);
    }

    const newSessionTimeoutId = setTimeout(() => {
      dispatch(logoutUser());
    }, 30 * 60 * 1000); // 30 minutes

    setSessionTimeoutId(newSessionTimeoutId);
  };

  useEffect(() => {
    startSessionTimeout();
    return () => {
      if (sessionTimeoutId) {
        clearTimeout(sessionTimeoutId);
      }
    };
  }, []);

  return { resetTimeouts, startSessionTimeout };
};

export default useTimeouts;