import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import Logo from "../../img/argentBankLogo.png";
import { logout } from "../../Store/AuthSlice";
import "./_header.scss";

const Header = ({ isEditing }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const isUserPage = location.pathname === "/user";

  return (
    <nav className="main-nav">
      {!isEditing && (
        <Link to="/" className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={Logo}
            alt="Argent Bank Logo"
          />
        </Link>
      )}
      <div>
        {!isEditing && isUserPage && user ? (
          <>
            <Link to="/user" className="main-nav-item">
              <FontAwesomeIcon icon={faUserCircle} />
              {user.userName}
            </Link>
            <button onClick={handleLogout} className="main-nav-item">
              <i className="fa fa-sign-out"></i>
              Sign Out
            </button>
          </>
        ) : (
          !isEditing && (
            <Link to="/login" className="main-nav-item">
              <FontAwesomeIcon
                icon={faUserCircle}
              />
               Sign In
            </Link>
          )
        )}
      </div>
      {isEditing && (
        <div className="edit-header">
          <div className="logo_bank_l">
            <i className="fa fa-user"></i>
            <h2>Argent Bank</h2>
          </div>
          <div className="user-info">
            <p>{user.userName}</p>
            <FontAwesomeIcon icon={faUserCircle} size="lg" />
            <FontAwesomeIcon icon={faGear} size="lg" />
            <FontAwesomeIcon icon={faPowerOff} size="lg" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
