import { useState } from "react";
import css from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/login", { email, password })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("id", response.data.id);
        if (response.data.role === "admin") {
          navigate("/admin/home");
        } else if (response.data.role === "user") {
          navigate("/user/home");
        }
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          alert("Login failed: " + error.response.data.error);
        } else if (error.request) {
          // The request was made but no response was received
          alert("Login failed: No response from server. Check your network connection.");
        } else {
          // Something happened in setting up the request that triggered an Error
          alert("Login failed: " + error.message);
        }
      });
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleLogin} className={`${css.card}`}>
        <h1 className={css.title}>Login</h1>
        <input className={css.textInput} type="text" placeholder="Email Address" id="email" onChange={(e) => setEmail(e.target.value)} />
        <input className={css.textInput} type="password" placeholder="Password" id="password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className={css.loginBtn}>
          Login
        </button>
        <h6 className={css.text}>
          Don't have account? <a href="/register">Sign up!</a>
        </h6>
      </form>
    </div>
  );
};

export default Login;
