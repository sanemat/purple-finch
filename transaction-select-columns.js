module.exports = transaction => ({
  amount: transaction.transaction.amount,
  updated_at: transaction.transaction.updated_at,
  jpyrate: transaction.transaction.jpyrate,
  hashed_id: transaction.transaction.hashed_id,
});
