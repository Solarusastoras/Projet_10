import "./_user.scss";
import NewUserProfile from "../../Components/UpdateUsername";
import Account from "../../Components/Account";
import UserProfile from "../../Components/UserProfile";
import HeaderUser from "../../Components/HeaderUser";

function User() {
  return (
      <div>
      <HeaderUser />
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back</h1>
          <UserProfile />
          <div>
            <NewUserProfile />
          </div>
        </div>
        <Account />
      </main>
      </div>
  );
}

export default User;