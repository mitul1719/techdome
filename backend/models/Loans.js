const mongoose = require("mongoose");

const RepaymentSchema = new mongoose.Schema({
  dueDate: Date,
  amount: Number,
  status: { type: String, default: "PENDING" },
});

const LoanSchema = new mongoose.Schema({
  userId: String, // Ideally linked to a user model
  amount: Number,
  term: Number,
  status: { type: String, default: "PENDING" },
  repayments: [RepaymentSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Loan", LoanSchema);
