import test from 'ava'; // eslint-disable-line import/no-extraneous-dependencies

const fillAndSumTransactions = require('./fill-and-sum-transactions');

const example = [
  { amount: -3100, updated_at: '2016-10-28T00:00:00+09:00', jpyrate: 1, hashed_id: '37oSnzllkHHTXbEZMPnYMw==' },
  { amount: -2100, updated_at: '2016-10-29T00:00:00+09:00', jpyrate: 1, hashed_id: '37oSnzllkHHTXbEZMPnYMw==' },
  { amount: -1100, updated_at: '2016-11-02T00:00:00+09:00', jpyrate: 1, hashed_id: '37oSnzllkHHTXbEZMPnYMw==' },
  { amount: -100, updated_at: '2016-11-02T00:00:00+09:00', jpyrate: 1, hashed_id: '37oSnzllkHHTXbEZMPnYMw==' },
];

test('fills and sums transactions', (t) => {
  const expected = new Map([
    ['2016-10-28', { value: -3100 }],
    ['2016-10-29', { value: -2100 }],
    ['2016-10-30', { value: 0 }],
    ['2016-10-31', { value: 0 }],
    ['2016-11-01', { value: 0 }],
    ['2016-11-02', { value: -1200 }],
  ]);
  t.deepEqual(fillAndSumTransactions(example), expected);
});
