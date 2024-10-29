import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser } from "../../Store/AuthAction";
import "./_form.scss";

function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warningTimeoutId, setWarningTimeoutId] = useState(null);
  const [logoutTimeoutId, setLogoutTimeoutId] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email: username, password }));
  };

  const resetTimeouts = () => {
    if (warningTimeoutId) {
      clearTimeout(warningTimeoutId);
    }
    if (logoutTimeoutId) {
      clearTimeout(logoutTimeoutId);
    }
    setShowWarning(false);

    const newWarningTimeoutId = setTimeout(() => {
      setShowWarning(true);
      const newLogoutTimeoutId = setTimeout(() => {
        dispatch(logoutUser());
      }, 2 * 60 * 1000); // 2 minutes
      setLogoutTimeoutId(newLogoutTimeoutId);
    }, 5 * 60 * 1000); // 5 minutes

    setWarningTimeoutId(newWarningTimeoutId);
  };

  useEffect(() => {
    if (token) {
      navigate("/user");
      resetTimeouts();
      window.addEventListener("mousemove", resetTimeouts);
      window.addEventListener("keydown", resetTimeouts);
    }

    return () => {
      window.removeEventListener("mousemove", resetTimeouts);
      window.removeEventListener("keydown", resetTimeouts);
      if (warningTimeoutId) {
        clearTimeout(warningTimeoutId);
      }
      if (logoutTimeoutId) {
        clearTimeout(logoutTimeoutId);
      }
    };
  }, [token, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button className="sign-in-button" type="submit" disabled={loading}>
        {loading ? "Loading..." : "Sign In"}
      </button>
      {error && <p className="error">{error}</p>}
      {showWarning && (
        <p className="warning">
          You will be logged out in 5 minutes due to inactivity.
        </p>
      )}
    </form>
  );
}

export default Form;
