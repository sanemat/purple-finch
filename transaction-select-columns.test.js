import test from 'ava'; // eslint-disable-line import/no-extraneous-dependencies

const transactionSelectColumns = require('./transaction-select-columns');
const examples = require('./example_transactions.json');

const transaction = examples.transactions[0];

test('selects columns', (t) => {
  const expected = { amount: -3100, updated_at: '2016-10-28T00:00:00+09:00', jpyrate: 1, hashed_id: '37oSnzllkHHTXbEZMPnYMw==' };
  t.deepEqual(transactionSelectColumns(transaction), expected);
});
