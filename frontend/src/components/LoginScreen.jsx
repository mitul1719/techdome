import React, { useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router";

const LoginScreen = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = Object.fromEntries(
      new FormData(e.target).entries()
    );

    const login = await fetch(
      "https://techdome-oitw.onrender.com/api/auth/login",
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    if (login.success) {
      localStorage.setItem("token", true);
      localStorage.setItem("user", login.userId);
      localStorage.setItem("isAdmin", login.isAdmin);
      if (login.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/apply");
      }
    }
  };

  const handleSignup = (e) => {
    console.log("hi");
    e.preventDefault();
    navigate("/signup");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (Boolean(localStorage.getItem("isAdmin"))) {
        navigate("/admin");
      } else {
        navigate("/apply");
      }
    }
  }, []);
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Please login to your account</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="login-footer">
          {/* <a href="#" className="forgot-password">
            Forgot Password?
          </a> */}
          <p className="signup-link">
            Don’t have an account?{" "}
            <a href="#" onClick={handleSignup}>
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
