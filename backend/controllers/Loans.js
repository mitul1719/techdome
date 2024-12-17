const Loan = require("../models/Loans");

// Create a new loan
exports.createLoan = async (req, res) => {
  const { userId, amount, term } = req.body;

  // Generate repayments (weekly basis)
  const repayments = [];
  const repaymentAmount = (amount / term).toFixed(2);

  let currentDate = new Date();
  for (let i = 0; i < term; i++) {
    currentDate.setDate(currentDate.getDate() + 7);
    repayments.push({
      dueDate: new Date(currentDate),
      amount: repaymentAmount,
    });
  }

  const newLoan = new Loan({
    userId,
    amount,
    term,
    repayments,
  });

  try {
    const savedLoan = await newLoan.save();
    res.status(201).json(savedLoan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Approve a loan (admin only)
exports.approveLoan = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ message: "Loan not found" });

    loan.status = "APPROVED";
    await loan.save();
    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a repayment
// exports.addRepayment = async (req, res) => {
//   const { amount } = req.body;
//   try {
//     const loan = await Loan.findById(req.params.id);
//     if (!loan) return res.status(404).json({ message: "Loan not found" });

//     const nextRepayment = loan.repayments.find(
//       (rep) => rep.status === "PENDING"
//     );
//     if (!nextRepayment)
//       return res.status(400).json({ message: "All repayments are completed" });

//     console.log(amount);
//     return;
//     if (amount === nextRepayment.amount) {
//       nextRepayment.status = "PAID";
//       await loan.save();

//       // Check if all repayments are paid
//       if (loan.repayments.every((rep) => rep.status === "PAID")) {
//         loan.status = "PAID";
//         await loan.save();
//       }
//       res.json(loan);
//     } else {
//       res.status(400).json({ message: "Repayment amount is incorrect" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Get all loans for a user
exports.getAllLoans = async (req, res) => {
  const { userId } = req.query;
  try {
    const loans = await Loan.find({ userId });
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a repayment
exports.addRepayment = async (req, res) => {
  const { amount } = req.body;
  try {
    // Find the loan by ID
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    // Find the next pending repayment
    const nextRepayment = loan.repayments.find(
      (rep) => rep.status === "PENDING"
    );

    if (!nextRepayment) {
      return res
        .status(400)
        .json({ message: "All repayments are completed for this loan" });
    }

    // Check if repayment amount is sufficient
    if (amount < nextRepayment.amount) {
      return res
        .status(400)
        .json({ message: "Repayment amount is insufficient" });
    }

    // Mark the repayment as paid
    nextRepayment.status = "PAID";

    // If repayment amount is greater than the required amount, handle overpayments (optional)
    const remainingAmount = amount - nextRepayment.amount;
    if (remainingAmount > 0) {
      // Logic to handle overpayments, e.g., apply it to the next repayment
      return res
        .status(400)
        .json({
          message: `Repayment amount is incorrect,should be equal to ${nextRepayment.amount}`,
        });
    }

    // Update loan status if all repayments are completed
    if (loan.repayments.every((rep) => rep.status === "PAID")) {
      loan.status = "PAID";
    }

    // Save the updated loan
    await loan.save();

    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve a loan (admin only)
exports.approveLoan = async (req, res) => {
  try {
    // Find the loan by its ID
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    // Change loan status to APPROVED
    loan.status = "APPROVED";
    await loan.save();

    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
