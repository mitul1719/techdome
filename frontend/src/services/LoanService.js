import axios from "axios";

const BASE_URL = import.meta.PROD
  ? "https://techdome-oitw.onrender.com"
  : "http://localhost:5000";

const API_BASE_URL = `${BASE_URL}/api/loans`;

export const createLoan = async (userId, amount, term) => {
  return await axios.post(API_BASE_URL, { userId, amount, term });
};

export const getLoans = async () => {
  return await axios.get(API_BASE_URL);
};

export const addRepayment = async (loanId, amount) => {
  return await axios.post(`${API_BASE_URL}/${loanId}/repay`, { amount });
};

export const approveLoan = async (loanId) => {
  return await axios.patch(`${API_BASE_URL}/${loanId}/approve`);
};
