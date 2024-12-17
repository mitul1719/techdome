import React, { useEffect, useState } from "react";
import { createLoan } from "../services/LoanService.js";

const LoanForm = ({ setTrigger }) => {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createLoan(
        localStorage.getItem("user"),
        amount,
        term
      );
      setTrigger(Math.random());
      console.log("Loan Created:", response.data);
    } catch (error) {
      console.error("Error creating loan:", error.message);
    }
  };

  return (
    <div>
      <h2>Apply for a Loan</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Loan Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Loan Term (weeks)"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          required
        />
        <button type="submit">Create Loan</button>
      </form>
    </div>
  );
};

export default LoanForm;
