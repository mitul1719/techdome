import React, { useState, useEffect } from "react";
import { getLoans } from "../services/LoanService.js";
import RepaymentForm from "./RepaymentForm";

const LoanList = ({ userId, trigger }) => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchLoans = async () => {
    try {
      setLoading(true);
      const response = await getLoans();
      setLoans(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching loans.");
      setLoading(false);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchLoans();
    }
  }, [userId, trigger]);

  if (loading) {
    return <p>Loading loans...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Your Loans</h2>
      {loans.length === 0 ? (
        <p>No loans found.</p>
      ) : (
        loans.map((loan) => (
          <div key={loan._id}>
            {/* <h3>ID: {loan._id}</h3> */}
            <p>Amount: ${loan.amount}</p>
            <p>Term: {loan.term} weeks</p>
            <p>Status: {loan.status}</p>
            <h4>
              Repayments: You can make repayments once its approved by the admin
            </h4>
            <ul
              style={{
                opacity: loan.status === "PENDING" ? 0.5 : 1,
                pointerEvents: loan.status === "PENDING" ? "none" : undefined,
              }}
            >
              {loan.repayments.map((repayment, index) => (
                <li key={index}>
                  Due on: {new Date(repayment.dueDate).toLocaleDateString()} -
                  Amount: ${repayment.amount} - Status: {repayment.status} -{" "}
                  {repayment.status !== "PAID" && (
                    <RepaymentForm loanId={loan._id} fetchLoans={fetchLoans} />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default LoanList;
