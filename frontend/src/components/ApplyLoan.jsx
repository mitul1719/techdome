import React, { useState } from "react";
import LoanForm from "./LoanForm";
import LoanList from "./LoanList";
import RepaymentForm from "./RepaymentForm";

const ApplyLoan = () => {
  const [selectedLoanId, setSelectedLoanId] = useState(() => {
    return localStorage?.getItem("user");
  });

  const [trigger, setTrigger] = useState(Math.random());

  const userId = localStorage.getItem("user");

  return (
    <div>
      <LoanForm setTrigger={setTrigger} />

      {userId && (
        <LoanList
          userId={userId}
          setSelectedLoanId={setSelectedLoanId}
          trigger={trigger}
        />
      )}
    </div>
  );
};

export default ApplyLoan;
