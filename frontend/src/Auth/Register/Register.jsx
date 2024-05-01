import React, { useState } from "react";
import axios from "axios";
import css from "./Register.module.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/register", formData)
      .then((response) => {
        alert("User registered successfully");
        navigate("/login");
      })
      .catch((error) => {
        alert("Error registering user");
      });
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSignup} className={`${css.card} ${css.form}`}>
        <h3 className={css.title}>Create New Account</h3>
        <input className={css.textInput} type="text" placeholder="Username" name="username" onChange={handleInputChange} />
        <input className={css.textInput} type="text" placeholder="Email address" name="email" onChange={handleInputChange} />
        <input className={css.textInput} type="password" placeholder="Password" name="password" onChange={handleInputChange} />
        <button type="submit" className={css.loginBtn}>
          Sign up
        </button>
        <a href="/" className={css.redirectLink}>
          Already have an account
        </a>
      </form>
    </div>
  );
};

export default Register;
