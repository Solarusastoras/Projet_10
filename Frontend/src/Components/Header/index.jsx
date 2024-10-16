import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Store/AuthSlice';
import "./_header.scss";
import LogoHeader from "../LogoHeader";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isUserPage = location.pathname === '/user';

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <LogoHeader />
      </Link>
      <div className="main-nav-items">
        {isUserPage ? (
          <div className="main-nav-item" onClick={handleLogout} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <i className="fa fa-user-circle"></i>
            <span className="nav-username">{user?.userName}</span>
            <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <span style={{ marginLeft: '5px' }}>Sign Out</span>
            </div>
          </div>
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