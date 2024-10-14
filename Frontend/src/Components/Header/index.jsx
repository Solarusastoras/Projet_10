import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Form/authSlice';
import "./_header.scss";
import useToken from '../utils/Token';
import Logo from "../../img/argentBankLogo.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useToken();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    setToken(null);
    navigate('/login');
  };

  const isUserPage = location.pathname === '/user';

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={Logo}
          alt="Argent Bank Logo"
        />
      </Link>
      <div>
        {token ? (
          isUserPage ? (
            <div className="main-nav-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
              <i className="fa fa-user-circle"></i>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </div>
          ) : (
            <button onClick={handleLogout} className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              Sign Out
            </button>
          )
        ) : (
          <Link to="/login" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;