import React, { useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = Object.fromEntries(
      new FormData(e.target).entries()
    );

    const register = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    if (register.success) {
      localStorage.setItem("token", true);
      localStorage.setItem("user", register.userId);
      localStorage.setItem("isAdmin", register.isAdmin);
      if (register.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/apply");
      }
    }
  };

  const handleLogin = (e) => {
    console.log("here");
    e.preventDefault();
    navigate("/login");
  };

  //   useEffect(() => {
  //     if (localStorage.getItem("token")) {
  //       if (Boolean(localStorage.getItem("isAdmin"))) {
  //         navigate("/admin");
  //       } else {
  //         navigate("/apply");
  //       }
  //     }
  //   }, []);
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome!</h1>
        <p className="login-subtitle">Please signup</p>
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
            Signup
          </button>
        </form>
        <div className="login-footer">
          {/* <a href="#" className="forgot-password">
            Forgot Password?
          </a> */}
          <p className="signup-link">
            Already have an account? <a onClick={handleLogin}>Login </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
