import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Store/AuthAction";
import useTimeouts from "../utils/UseTimeouts"; 
import "./_form.scss";

const Form = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [countdown, setCountdown] = useState(10 * 60); // 10 minutes en secondes
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, loading, error } = useSelector((state) => state.auth);
  const { resetTimeouts, showWarning } = useTimeouts();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email: username, password }));
  };

  useEffect(() => {
    if (token) {
      navigate("/user");
      resetTimeouts();
      document.addEventListener("mousemove", resetTimeouts);
      document.addEventListener("keydown", resetTimeouts);

      // Démarrer le compte à rebours
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(countdownInterval);
            dispatch(logoutUser());
            navigate("/login");
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => {
        clearInterval(countdownInterval);
        document.removeEventListener("mousemove", resetTimeouts);
        document.removeEventListener("keydown", resetTimeouts);
      };
    }
  }, [token, navigate, resetTimeouts, dispatch]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

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
      {showWarning && <p className="warning">You will be logged out in 2 minutes due to inactivity.</p>}
      {token && <p className="countdown">Time remaining: {formatTime(countdown)}</p>}
    </form>
  );
};

export default Form;