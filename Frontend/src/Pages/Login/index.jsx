import React from "react";
import "./_login.scss";
import Form from "../../Components/Form/index.jsx";
import Header from "../../Components/Header";
import Userlogin from "../../img/user.webp";

const Login = () => {
  return (
    <div>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <div className="circle_user_login_bk">
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
          <h1>Sign In</h1>
          <Form />
        </section>
      </main>
    </div>
  );
};

export default Login;
