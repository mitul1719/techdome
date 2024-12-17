import React, { useEffect } from "react";

import { Outlet, useNavigate } from "react-router";

import "./App.css";

function App() {
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("isAdmin");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="App">
      <header
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "1rem",
        }}
      >
        {isAdmin ? <div class="badge">Admin</div> : null}

        <button
          onClick={() => {
            localStorage.clear();
            navigate("login");
          }}
        >
          Logout
        </button>
      </header>
      <h1>Mini Loan Application</h1>

      <Outlet />
    </div>
  );
}

export default App;
