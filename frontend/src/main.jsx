import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router";

import App from "./App.jsx";
import LoginScreen from "./components/LoginScreen.jsx";
import AdminLoanList from "./components/AdminLoanList.jsx";
import ApplyLoan from "./components/ApplyLoan.jsx";
import Register from "./components/Register.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" element={<LoginScreen />} />
          <Route path="apply" element={<ApplyLoan />} />
          <Route path="admin" element={<AdminLoanList />} />
          <Route path="signup" element={<Register />} />
        </Route>
      </Routes>{" "}
    </BrowserRouter>
  </StrictMode>
);
