/**
 * Calculate monthly EMI amount.
 * @param {number} price - Principal amount (selling price)
 * @param {number} annualInterestRate - Annual interest rate in percent (e.g. 10.5)
 * @param {number} tenureMonths - Loan tenure in months
 * @returns {number} Monthly EMI rounded to nearest integer
 */
function calculateEmi(price, annualInterestRate, tenureMonths) {
  if (!price || !tenureMonths || tenureMonths <= 0) {
    return 0;
  }

  if (!annualInterestRate || annualInterestRate === 0) {
    return Math.round(price / tenureMonths);
  }

  const monthlyRate = annualInterestRate / 12 / 100;
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (price * monthlyRate * factor) / (factor - 1);

  return Math.round(emi);
}

/**
 * Calculate total payable amount over the EMI tenure.
 */
function calculateTotalPayable(monthlyAmount, tenureMonths) {
  return monthlyAmount * tenureMonths;
}

module.exports = { calculateEmi, calculateTotalPayable };
