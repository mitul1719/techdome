import React, { useState } from "react";
import { addRepayment } from "../services/LoanService.js";

const RepaymentForm = ({ loanId, fetchLoans }) => {
  const [amount, setAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await addRepayment(loanId, amount);
      fetchLoans();
      setSuccessMessage("Repayment added successfully!");
      setAmount(""); // Reset the amount field
    } catch (error) {
      setErrorMessage(
        "Error adding repayment: " + error.response?.data?.message ||
          error.message
      );
    }
  };

  return (
    <div>
      <h4>Make a Repayment</h4>
      {/* <h3>{loanId}</h3> */}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Repayment Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Add Repayment</button>
      </form>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default RepaymentForm;
