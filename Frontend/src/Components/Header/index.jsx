import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Logo from "../../img/argentBankLogo.webp";
import { logout } from "../../Store/AuthSlice";
import "./_header.scss";
import Vault from "../../img/vault.webp";
import Setting from "../../img/settings.webp";
import Userlogin from "../../img/user.webp";

const Header = ({ isEditing }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
            className="main-nav-logo-settings icon-spacing" // Ajout de la classe ici
            src={Setting}
            alt="Setting Logo"
          />
          <FontAwesomeIcon
            icon={faPowerOff}
            className="icon-spacing"
            size="lg"
            onClick={handleLogout}
          />{" "}
          {/* Ajout de la classe ici */}
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
              <div className="circle_user_login_bk icon-spacing">
                <img
                  className="user_icon_login"
                  src={Userlogin}
                  alt="User Logo"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(188deg) brightness(119%) contrast(119%)",
                  }}
                />
              </div>
              <span className="username-spacing">{user.userName}</span>
            </Link>
            <div onClick={handleLogout} className="main-nav-item">
              <FontAwesomeIcon icon={faSignOutAlt} className="icon-spacing" />
              <span className="signout-spacing">Sign Out</span>
            </div>
          </>
        ) : (
          <Link to="/login" className="main-nav-item">
            <div className="circle_user_login_bk icon-spacing">
              <img
                className="user_icon_login"
                src={Userlogin}
                alt="User Logo"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(188deg) brightness(119%) contrast(119%)",
                }}
              />
            </div>
            <span className="signin-spacing">Sign In</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
