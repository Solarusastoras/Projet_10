import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle, faUser } from "@fortawesome/free-regular-svg-icons"; // Import faUser
import Logo from "../../img/argentBankLogo.png";
import { logout } from "../../Store/AuthSlice";
import "./_header.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Vault from "../../img/vault.png";
import Setting from "../../img/settings.png";

const Header = ({ isEditing }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (isEditing) {
    return (
      <div className="edit-header">
        <div className="logo_bank_l">
          <img className="main-nav-logo-vault" src={Vault} alt="Icon Vault" />
          <h2 className="weight_header">Argent Bank</h2>
        </div>
        <div className="user-info">
          <p>{user.userName}</p>
          <FontAwesomeIcon icon={faUser} className="circle-icon" size="lg" />
          <img
            className="main-nav-logo-settings"
            src={Setting}
            alt="Setting Logo"
          />
          <FontAwesomeIcon icon={faPowerOff} size="lg" />
        </div>
      </div>
    );
  }

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={Logo}
          alt="Argent Bank Logo"
        />
      </Link>
      <div className="main-nav-items">
        {user ? (
          <>
            <Link to="/user" className="main-nav-item">
              <FontAwesomeIcon icon={faUserCircle} className="icon-spacing" />
              <span className="username-spacing">{user.userName}</span>
            </Link>
            <div onClick={handleLogout} className="main-nav-item">
              <FontAwesomeIcon icon={faSignOutAlt} className="icon-spacing" />
              <span className="signout-spacing">Sign Out</span>
            </div>
          </>
        ) : (
          <Link to="/login" className="main-nav-item">
            <FontAwesomeIcon icon={faUserCircle} className="icon-spacing" />
            <span className="signin-spacing">Sign In</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;