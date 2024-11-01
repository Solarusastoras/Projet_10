import { useDispatch } from "react-redux";
import { logoutUser } from "../../../Store/AuthAction.js";
import { useState, useCallback } from "react";

const useTimeouts = () => {
  const [logoutTimeoutId, setLogoutTimeoutId] = useState(null);
  const dispatch = useDispatch();

  const resetTimeouts = useCallback(() => {
    if (logoutTimeoutId) {
      clearTimeout(logoutTimeoutId);
    }

    const newLogoutTimeoutId = setTimeout(() => {
      dispatch(logoutUser());
    }, 35 * 60 * 1000); // 5 minutes

    setLogoutTimeoutId(newLogoutTimeoutId);
  }, [logoutTimeoutId, dispatch]);

  return { resetTimeouts };
};

export default useTimeouts;