import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/loans";

export const createLoan = async (userId, amount, term) => {
  return await axios.post(API_BASE_URL, { userId, amount, term });
};

export const getLoans = async (userId) => {
  return await axios.get(`${API_BASE_URL}${userId ? `?userId=${userId}` : ""}`);
};

export const addRepayment = async (loanId, amount) => {
  return await axios.post(`${API_BASE_URL}/${loanId}/repay`, { amount });
};

export const approveLoan = async (loanId) => {
  return await axios.patch(`${API_BASE_URL}/${loanId}/approve`);
};
