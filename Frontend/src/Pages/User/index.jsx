import "./_user.scss";
import NewUserProfile from "../../Components/UpdateUsername";
import Account from "../../Components/Account";

function User() {
  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back</h1>
        <br />
        <h2>{localStorage.getItem("username")}</h2>
        <div>
          <NewUserProfile />
        </div>
      </div>
      <Account />
    </main>
  );
}

export default User;
