import "./_login.scss";
import Form from "../../Components/Form/index.jsx";

function Login() {
  return (
    <main className="main bg-dark">
    <section class="sign-in-content">
      <i class="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
       <Form />
    </section>
    </main>
  );
}

export default Login;
