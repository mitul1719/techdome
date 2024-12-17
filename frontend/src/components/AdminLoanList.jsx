import React, { useState, useEffect } from "react";
import { getLoans, approveLoan } from "../services/LoanService.js";

const AdminLoanList = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        setLoading(true);
        const response = await getLoans(); // Fetch all loans without filtering by user
        setLoans(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching loans.");
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const handleApproveLoan = async (loanId) => {
    try {
      const response = await approveLoan(loanId);
      setLoans((prevLoans) =>
        prevLoans.map((loan) =>
          loan._id === loanId ? { ...loan, status: response.data.status } : loan
        )
      );
    } catch (error) {
      console.error("Error approving loan:", error.message);
    }
  };

  if (loading) {
    return <p>Loading loans...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Admin: Approve Loans</h2>
      {loans.length === 0 ? (
        <p>No loans found.</p>
      ) : (
        loans.map((loan) => (
          <div key={loan._id}>
            <h3>Loan ID: {loan._id}</h3>
            <p>Amount: ${loan.amount}</p>
            <p>Term: {loan.term} weeks</p>
            <p>Status: {loan.status}</p>
            {loan.status === "PENDING" && (
              <button onClick={() => handleApproveLoan(loan._id)}>
                Approve Loan
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminLoanList;
