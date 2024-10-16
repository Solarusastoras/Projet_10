import React from "react";
import "./_login.scss";
import Form from "../../Components/Form/index.jsx";
import Header from "../../Components/Header/index.jsx";

const Login = () => {
  return (
    <div>
      <Header />
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <Form />
      </section>
    </main>
    </div>
  );
};

export default Login;
