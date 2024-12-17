const express = require("express");
const router = express.Router();
const {
  addRepayment,
  approveLoan,
  createLoan,
  getAllLoans,
} = require("../controllers/Loans");

router.get("/", getAllLoans);

// Create a loan
router.post("/", createLoan);

// Approve a loan (admin only)
router.patch("/:id/approve", approveLoan);

// Add a repayment
router.post("/:id/repay", addRepayment);

// Approve a loan (admin only)
router.patch("/:id/approve", approveLoan);

module.exports = router;
