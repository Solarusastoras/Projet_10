import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, logout } from '../../Store/AuthSlice';
import './_form.scss';

function Form() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email: username, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (token) {
      console.log('Token:', token);
      console.log('Username:', username);
      navigate('/user');
    }
  }, [token, navigate, username]);

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
        {loading ? 'Loading...' : 'Sign In'}
      </button>
      {error && <p className="error">{error}</p>}
      {token && <p className="token">Token: {token}</p>}
      {user && <p className="user">User: {user.email}</p>}
      {user && <button type="button" onClick={handleLogout}>Logout</button>}
    </form>
  );
}

export default Form;