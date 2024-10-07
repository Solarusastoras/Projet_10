import { Link } from "react-router-dom";
import "./_header.scss";
import Logo from "../../img/argentBankLogo.png";

function Header() {
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
        <Link to="/login" className="main-nav-item">
          <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
      </div>
    </nav>
  );
}

export default Header;
