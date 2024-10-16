import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Store/AuthSlice";
import useUsername from "../../Components/utils/use_username";
import LogoHeader from "../LogoHeader";
import "./_headeruser.scss";

function HeaderUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [username] = useUsername();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const isUserPage = location.pathname === "/user";

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <LogoHeader
        />
      </Link>
      <div className="main-nav-items">
        {isUserPage ? (
          <div
            className="main-nav-item"
            style={{ display: "flex", alignItems: "center" }}
          >
            <i className="fa fa-user-circle"></i>
            <span className="nav-username">{username}</span>

            <div
              onClick={handleLogout}
              style={{ cursor: "pointer", marginLeft: "10px" }}
            >
              <i className="fa-solid fa-right-from-bracket "> </i> Sign Out
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
}

export default HeaderUser;
