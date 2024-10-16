import Logo from "../../img/argentBankLogo.png";
import { Link} from "react-router-dom";


function LogoHeader() {
  return (
    <Link to="/" className="main-nav-logo">
      <img
        className="main-nav-logo-image"
        src={Logo}
        alt="Argent Bank Logo"
      />
    </Link>
  );
}

export default LogoHeader;