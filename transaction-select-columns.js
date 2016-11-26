module.exports = transaction => ({
  amount: transaction.amount,
  updated_at: transaction.updated_at,
  jpyrate: transaction.jpyrate,
  hashed_id: transaction.hashed_id,
});
